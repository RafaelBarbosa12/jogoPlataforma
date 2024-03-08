var x = 0
var y = 0
var z = 0
var clicou1 = false;
var clicou2 = false;
var clicou3 = false;

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
        var pedra1 = this.add.image(100, 300, 'ground').setScale(0.1);
        var pedra2 = this.add.image(100, 500, 'ground').setScale(0.1);
        var pedra3 = this.add.image(100, 100, 'ground').setScale(0.1);
        var pedra4 = this.add.image(400, 400, 'floresta').setScale(0.1);

        // Adiciona a colisão entre o personagem e as plataforma
        // Cria o cursor de teclado
        this.cursor = this.input.keyboard.createCursorKeys();
        
        // Adiciona interatividade para as pedras
        pedra1.setInteractive();
        pedra1.on('pointerdown', () => {
            this.clicado(pedra1, 1);
        });

        pedra2.setInteractive();
        pedra2.on('pointerdown', () => {
            this.clicado(pedra2, 2);
        });

        pedra3.setInteractive();
        pedra3.on('pointerdown', () => {
            this.clicado(pedra3, 3);
        });

        pedra4.setInteractive();
        pedra4.on('pointerdown', () => {
            if((x + y + z) === 3){
                this.scene.start('Scene');
            }
        });

    }

    update() {
    
    }

    //função que troca de cena
    transitionToScene(cena) {
        this.scene.start(cena); // Inicia a cena 1
    }

    clicado(pedra, num) {
        if (num === 1) {
            if (clicou1) {
                pedra.setScale(0.1);
                x = 0;
                clicou1 = false;
            } else {
                pedra.setScale(0.2);
                x = 4;
                clicou1 = true;
            }
        } else if (num === 2) {
            if (clicou2) {
                pedra.setScale(0.1);
                y = 0;
                clicou2 = false;
            } else {
                pedra.setScale(0.2);
                y = 2;
                clicou2 = true;
            }
        } else if (num === 3) {
            if (clicou3) {
                pedra.setScale(0.1);
                z = 0;
                clicou3 = false;
            } else {
                pedra.setScale(0.2);
                z = 1;
                clicou3 = true;
            }
        }
    }
}
