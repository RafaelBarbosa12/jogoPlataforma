//inicio da classe final
class FinalScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'FinalScene'
        });
    }

    //carrega a imagem de fundo
preload() {
    this.load.image('azul', 'assets/azul.avif');
}

create() {
    var tempotext

    //inclui a imagem de fundo
    this.add.image(0, 0, 'azul').setOrigin(0).setScale(1.5);

    //inclui o primeiro resultado na lista
    if(recordes.length === 0){
        recordes.push(resultado)
    }
    else {

    //calcula e armazena o top3 jogos concluidos mais rápido
    for(var i = 0; i < 3; i++){

        //vê se recorde é menor do que o que está na posição ou se a posição é nula
        if(recordes[i] >= resultado || recordes[i] == null){
            //adiciona o recorde na posição i
            recordes.splice(i, 0, resultado)
            break
        }
    }
}
    //remove todos os itens que estão na posição 3 ou mais da lista
    recordes.splice(3)

    //declaração dos resultados
    tempotext = this.add.text(100, 100, 'Parabéns, você ganhou', {fontSize:'45px', fill:'white'});
    tempotext = this.add.text(200, 200, 'Top3 tempos:', {fontSize:'35px', fill:'white'});
    tempotext = this.add.text(200, 400, 'Aperte "R" para reiniciar', {fontSize:'25px', fill:'white'});
    tempotext = this.add.text(200, 240, '1º: '+ recordes[0] + " Segundos", {fontSize:'35px', fill:'white'});

    //controla a exibição de apenas os resultados já obtidos
    if(recordes.length > 1){
        tempotext = this.add.text(200, 290, '2º: '+ recordes[1] + " Segundos", {fontSize:'35px', fill:'white'});
    }
    if(recordes.length > 2){
        tempotext = this.add.text(200, 340, '3º: '+ recordes[2] + " Segundos", {fontSize:'35px', fill:'white'});
    }

    //volta para a cena inicial ao apertar "R"
    this.input.keyboard.on('keydown-R', () => this.transitionToScene1("mainScene"));
}


update() {
}

//função que muda a cena
transitionToScene1(cena) {
    //reinicia o tempo
    tempo = 0
    this.scene.start(cena); // Inicia a cena 1
}
}