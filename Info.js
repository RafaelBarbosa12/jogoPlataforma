class Info extends Phaser.Scene {
    constructor() {
        super({
            key: 'info'
        });
    }

    preload() {
        // Carrega os recursos necessários
        this.load.image('explicacao', 'assets/explicacao.PNG');
        this.load.image('voltar', 'assets/Voltar.png');
    }

    create() {
        //adiciona imagem de fundo
        const background = this.add.image(400, 300, 'explicacao').setScale(1.2)

        //configurações do botão voltar
        const voltar = this.add.image(400, 500, 'voltar').setOrigin(0.5).setScale(1);

        voltar.setInteractive();
        voltar.on('pointerdown', () => {
            // Volta para a tela inicial quando o botão "voltar" é clicado
            this.scene.start('Tela');
        });

        // Adicionar eventos de hover
        voltar.on('pointerover', () => {
            voltar.setScale(1.2);
        });

        voltar.on('pointerout', () => {
            voltar.setScale(1);
        });
    }
}
