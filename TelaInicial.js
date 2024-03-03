class TelaInicial extends Phaser.Scene {
    constructor() {
        super({
            key: 'Tela'
        });
    }

    preload() {
        // Carrega os recursos necessários
        this.load.image('tela', 'assets/tela.jpeg');
        this.load.image('play', 'assets/play.png');
        this.load.image('detalhes', 'assets/Detalhes.png');
    }

    create() {

        // Cria o mapa e as camadas
        const background = this.add.image(400, 300, 'tela').setScale(6);

        const play = this.add.image(400, 300, 'play').setOrigin(0.5).setScale(1.4);
        const detalhes = this.add.image(400, play.y + play.height * play.scaleY + 80, 'detalhes').setOrigin(0.5).setScale(0.7);

        // Habilitar interatividade e adicionar evento de clique ao botão "play"
        play.setInteractive();
        play.on('pointerdown', () => {
            // Iniciar a cena principal quando o botão "play" é clicado
            this.scene.start('mainScene');
        });

        // Adicionar eventos de hover
        play.on('pointerover', () => {
            play.setScale(1.6);
        });

        play.on('pointerout', () => {
            play.setScale(1.4);
        });


        detalhes.setInteractive();
        detalhes.on('pointerover', () => {
            detalhes.setScale(0.9);
        });

        detalhes.setInteractive();
        detalhes.on('pointerdown', () => {
            // Iniciar a cena principal quando o botão "play" é clicado
            this.scene.start('info');
        });

        detalhes.on('pointerout', () => {
            detalhes.setScale(0.7);
        });

    }
}