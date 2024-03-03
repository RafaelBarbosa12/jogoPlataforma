//Declaração das variaveis fora do escopo da classe para que as variaveis funcionem em todas as cenas
var tempo = 0;
var tempotext;
var resultado = 0;
hasBeenToMain = 0
recordes = []

//Início da classe MainScene
class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'mainScene'
        });
    }

    //Carrega as imagens do jogo
    preload() {
        this.load.image('floresta', 'assets/floresta.avif');
        this.load.image('ground', 'assets/pedra.webp');
        this.load.spritesheet('tyler', 'assets/Persona-principal.png', { frameWidth: 32, frameHeight: 32 });
    }
    
    create() {
        //cria a imagem de fundo
        this.add.image(0, 0, 'floresta').setOrigin(0).setScale(1.5);
        
        // Adiciona as plataformas diretamente à cena
        var platform1 = this.physics.add.image(100, 600, 'ground').setImmovable().setScale(0.1);
        var platform2 = this.physics.add.image(100, 450, 'ground').setImmovable().setScale(0.1);
        var platform3 = this.physics.add.image(300, 300, 'ground').setImmovable().setScale(0.1)
        var platform4 = this.physics.add.image(20, 300, 'ground').setImmovable().setScale(0.1);

        //retira a gravidade das plataformas
        platform1.body.allowGravity = false;
        platform2.body.allowGravity = false;
        platform3.body.allowGravity = false;
        platform4.body.allowGravity = false;

        //Placar que conta o tempo que está passando
        tempotext = this.add.text(20, 20, 'Tempo:'+ tempo, {fontSize:'45px', fill:'white'});

        // criando o cronometro. (um amigo me ensinou a fazer)
        if(hasBeenToMain == 0 && resultado < 1){
        setInterval(() => {
            tempo++;
            tempotext.setText('Tempo: ' + tempo)
        }, 1000);
    }

    //aumenta o hasBeenToMain para evitar que o cronometro seja chamado duas vezes quando o jogador perder
    hasBeenToMain = 1

    //define as físicas e configurações do Tyler
        tyler = this.physics.add.sprite(100, 450, 'tyler').setScale(2.4)
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
            tyler.setVelocityY(-330);
            this.isJumping = true;
        }
        // Reseta pulo quando o jogador não estiver mais tocando no chão
        if (tyler.body.touching.down) {
            this.isJumping = false;
        }

        //se o jogador cair, ele volta pra mainScene
        if(tyler.y > 1010){
            this.transitionToScene("mainScene")
        }

        //Inicia a cena 2 se o jogador atingir o limite superior da tela
        if(tyler.y < 0){
            this.transitionToScene("Scene")
        }
    }

    //função que troca de cena
    transitionToScene(cena) {
        this.scene.start(cena); // Inicia a cena 1
    }
}

