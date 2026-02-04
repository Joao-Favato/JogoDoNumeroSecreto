let listaDeNumerosSorteados = [];
let limiteLista = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function trocarImagem(){
  let image = document.getElementById('Pokémon');
  if(image.src === "http://127.0.0.1:5500/img/psyduck.png"){
      image.src = "http://127.0.0.1:5500/img/pikachu2.png";
  }
  else if(image.src === "http://127.0.0.1:5500/img/pikachu2.png"){
      image.src = "http://127.0.0.1:5500/img/psyduck.png";
  }
}
function exibiçãoDeTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial(){
    exibiçãoDeTexto('h1', 'Jogo do Número Secreto');
    exibiçãoDeTexto('p', 'Escolha um número entre 1 e 10' );
}
exibirMensagemInicial()

function verificarChute(){
    let chute = document.querySelector('input').value;
    let palavraTentativa = tentativas > 1? 'tentativas' : 'tentativa'
    let mensagemTentativas = `Você descobriu o número secreto ${numeroSecreto} com ${tentativas} ${palavraTentativa}!`;
        if (numeroSecreto == chute){
        exibiçãoDeTexto('h1', 'Parabéns!');
        exibiçãoDeTexto('p', mensagemTentativas);
        trocarImagem();
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
            exibiçãoDeTexto('p', `O número secreto é menor que ${chute}`);
        } else {
            exibiçãoDeTexto('p', `O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparcampo();
    } 

    }

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random()*10 + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista == limiteLista){
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
        } else {
            listaDeNumerosSorteados.push(numeroEscolhido);
            console.log(listaDeNumerosSorteados);
            return numeroEscolhido;
        }
}

function limparcampo(){
    chute = document.querySelector('input');
    chute.value = '';
}
/// Uau
function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparcampo();
    exibirMensagemInicial();
    trocarImagem();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
