//Classe da segunda cena
class Scene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Scene'
        });
    }
    //carrega as imagens no jogo
    preload() {
        this.load.image('ceu', 'assets/sky.jpg');
        this.load.image('nuvem', 'assets/cloud.webp ');
        this.load.spritesheet('tyler', 'assets/Persona-principal.png', { frameWidth: 32, frameHeight: 32 });
    }

    
    create() {
        //variaveis responsáveis pela troca no spawn de uma das nuvens
        var x = 1
        var y = 2

        //adiciona a imagem de fundo
        this.add.image(0, 0, 'ceu').setOrigin(0);
        
        // Adiciona as plataformas diretate à cena
        var platform1 = this.physics.add.image(100, 600, 'nuvem').setImmovable().setScale(0.2);
        var platform2 = this.physics.add.image(100, 450, 'nuvem').setImmovable().setScale(0.2);
        var platform3 = this.physics.add.image(500, 350, 'nuvem').setImmovable().setScale(0.2);
        var platform4 = this.physics.add.image(20, 300, 'nuvem').setImmovable().setScale(0.2);
        var platform5 = this.physics.add.image(300, 200, 'nuvem').setImmovable().setScale(0.2);

        //desativa a gravidade das plataformas
        platform1.body.allowGravity = false;
        platform2.body.allowGravity = false;
        platform3.body.allowGravity = false;
        platform4.body.allowGravity = false;
        platform5.body.allowGravity = false;

        //Exibe o texto que conta o tempo
        tempotext = this.add.text(20, 20, 'Tempo:'+ tempo, {fontSize:'45px', fill:'white'});

        //configurações do Tyler
        tyler = this.physics.add.sprite(100, 450, 'tyler').setScale(2.4);
        tyler.body.setSize(15, 23,true)
        tyler.anims.play('andar');
        this.isJumping = false;

        // Adiciona a colisão entre o personagem e as plataformas
        this.physics.add.collider(tyler, [platform1, platform2, platform3, platform4, platform5]);

        this.tweens.add({
            targets: [platform2],
            x: '+=300', // Move 300 pixels para a direita
            ease: 'Linear',
            duration: 1000, // Tempo para completar o movimento
            yoyo: true, // Vai e volta
            repeat: -1 // Repetir indefinidamente
        });

        this.tweens.add({
            targets: [platform3],
            x: '+=200', // Move 200 pixels para a direita
            ease: 'Linear',
            duration: 1000, // Tempo para completar o movimento
            yoyo: true, // Vai e volta
            repeat: -1 // Repetir indefinidamente
        });

        this.tweens.add({
            targets: [platform4],
            y: '-=400', // Move 400 pixels para a esquerda
            ease: 'Linear',
            duration: 4000, // Tempo para completar o movimento
            yoyo: true, // Vai e volta
            repeat: -1 // Repetir indefinidamente
        });
        // Cria a animação para o personagem
        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('tyler', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        // Cria o cursor de teclado
        this.cursor = this.input.keyboard.createCursorKeys();
        this.time.addEvent({
            delay: 1000, // Atraso de 3000 milissegundos (3 segundos)
            callback: teletransportarPlataforma, // Função a ser chamada após o atraso
            callbackScope: this, // Escopo da função (no contexto da cena)
            loop: true // Loop para repetir o evento indefinidamente
        });

        //Função para teletransportar uma das plataformas
        function teletransportarPlataforma() {
            if(x%2 == 0){
                var novaPosicaoX = 700;
            }
            else{
                var novaPosicaoX = 300
            }
            x += 1;
        
            // Teletransportar a plataforma para a nova posição
            platform5.x = novaPosicaoX;
        }
    }


    update() {
        // Movimento do personagem
        if (this.cursor.left.isDown) {
            tyler.setVelocityX(-160);
            tyler.anims.play('andar', true);
            tyler.setFlip(true, false)
        } else if (this.cursor.right.isDown) {
            tyler.setVelocityX(160);
            tyler.anims.play('andar', true);
            tyler.setFlip(false, false)
        } else {
            tyler.setVelocityX(0);
            tyler.anims.stop();
        }

        // Verifica se o jogador está tocando no chão para permitir o pulo
        if (this.cursor.up.isDown && !this.isJumping) {
            tyler.setVelocityY(-330);
            this.isJumping = true;
        }

        // Reseta o pulo quando o jogador não estiver mais tocando no chão
        if (tyler.body.touching.down) {
            this.isJumping = false;
        }

        //inicia a cena 3 se o personagem atingir o limite superior da tela e esteja tocando uma das plataformas
        if(tyler.y < 0 && tyler.body.touching.down){
            this.transitionToScene("Scene3")
        }

        //Volta para a cena principal se cair
        if(tyler.y > 1010){
            this.transitionToScene("mainScene")
        }
    }

    //Função que chama as cenas
    transitionToScene(cena) {
        this.scene.start(cena); // Inicia a cena 1
    }
}
