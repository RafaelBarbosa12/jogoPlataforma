//Início da classe Scene3
class Scene3 extends Phaser.Scene {
    constructor() {
        super({
            key: 'Scene3'
        });
    }

    //Carrega as imagens do jogo
    preload() {
        this.load.image('universo', 'assets/universo.jpg');
        this.load.image('nave', 'assets/nave.png');
        this.load.spritesheet('tyler', 'assets/Persona-principal.png', { frameWidth: 32, frameHeight: 32 });
    }
    
    create() {
        //cria a imagem de fundo
        this.add.image(0, 0, 'universo').setOrigin(0).setScale(1.5);
        
        // Adiciona as plataformas diretamente à cena
        var platform1 = this.physics.add.image(100, 600, 'nave').setImmovable().setScale(0.1);
        var platform2 = this.physics.add.image(100, 430, 'nave').setScale(0.1);
        var platform3 = this.physics.add.image(500, 300, 'nave').setScale(0.1)
        var platform4 = this.physics.add.image(20, 300, 'nave').setImmovable().setScale(0.1);

        //desativa a gravidade das plataformas
        platform1.body.allowGravity = false;
        platform2.body.allowGravity = false;
        platform3.body.allowGravity = false;
        platform4.body.allowGravity = false;

        //campo de texto que exibe o tempo passado
        tempotext = this.add.text(20, 20, 'Tempo:'+ tempo, {fontSize:'45px', fill:'white'});

        //configurações do Tyler
        tyler = this.physics.add.sprite(100, 450, 'tyler').setScale(2.4);
        tyler.body.setSize(15, 23,true)
        tyler.anims.play('andar');
        this.isJumping = false;

        // Adiciona a colisão entre o personagem e as plataformas
        this.physics.add.collider(tyler, [platform1, platform2, platform3, platform4]);

        this.tweens.add({
            targets: [platform2],
            x: '+=600', // Move 600 pixels para a direita
            ease: 'Linear',
            duration: 2000, // Tempo para completar o movimento
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

        //chama a função para remover a plataforma inicial depois de 7 segundos
        this.time.addEvent({
            delay: 7000, // Atraso de 7000 milissegundos (7 segundos)
            callback: afundarPlataforma,
            callbackScope: this,
            loop: true
        });

        //remove plataforma
        function afundarPlataforma() {
            platform1.destroy()
        }

        // Cria o cursor de teclado
        this.cursor = this.input.keyboard.createCursorKeys();
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
            tyler.setVelocityY(-350);
            this.isJumping = true;
        }

        // Reseta o pulo quando o jogador não estiver mais tocando no chão
        if (tyler.body.touching.down) {
            this.isJumping = false;
        }

        //se o jogador cair, ele volta pra mainScene
        if(tyler.y > 1010){
            this.transitionToScene("mainScene")
        }

        //Inicia a tela final se o jogador atingir o limite superior da tela
        if(tyler.y < 0){

            //resultado recebe tempo
            resultado = tempo
            this.transitionToScene("FinalScene")
        }
    }

    //função que troca de cena
    transitionToScene(cena) {
        this.scene.start(cena);
    }
}
