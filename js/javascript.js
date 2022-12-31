//Variveis de escopo global
var altura = 0 //Variavel que ditara a altura a ser usada
var largura = 0 //Variavel que ditara a largura a ser usada
var vidas = 1 //Variavel que controlara o numero de vidas do usuario
var tempo = 50 //Variavel que define o tempo limite
var tempomosquito=1500 // Tempo para dificuldade inicial 
var dificuldade = (window.location.search).slice(1) // Variavel que define a dificuldade 

//Usando a dificuldade para definir o tempo
if(dificuldade === 'facil'){
    tempomosquito=2500
}else if(dificuldade==='dificil'){
    tempomosquito=2000
}else{
    tempomosquito=1000
}



//Usando innerHTML para atualizar o tempo de forma programatica
document.getElementById('cronometro').innerHTML = tempo

//Usando setInterval para decrementar o tempo e fazer controle
var cronometro=setInterval(function(){
    tempo--
    if(tempo <0){
        clearInterval(cronometro)//Para de decrementar o tempo
        clearInterval(criacao)//Para a criacao de mosquitos
        window.location.href='./vitoria.html'//Redireciona 
    }else{
        document.getElementById('cronometro').innerHTML = tempo
    }
},1000)

//funcao para ajustar o tamanho do jogo e a area disponivel de acordo com o dispositivoS
function ajustaTamanho(){
    altura = window.innerHeight
    largura = window.innerWidth
    console.log(altura, largura)
}
ajustaTamanho()


//Funcao que gera a posicao e faz testes
function posicaoRandomica(){
    if(document.getElementById('mosquito')){//Se o mosquito nao foi clicado
        document.getElementById('mosquito').remove()//Remover
        if(vidas>3){
            window.location.href='./fim_de_jogo.html'//Se perder todas as vidas
        }else{
            document.getElementById('v'+vidas).src = './img/coracao_vazio.png'//Decremento de vidas
        }
        vidas++//Controle
    }
    //Criacao de posicoes aleatorias e testes
    var posicaoX=Math.floor(Math.random()*largura)-90
    var posicaoY=Math.floor(Math.random()*altura)-90
    posicaoX = posicaoX < 0 ? 0:posicaoX
    posicaoY = posicaoY < 0 ? 0:posicaoY
    console.log(posicaoX, posicaoY)
    //Criacao do elemento mosquito
    var mosquito = document.createElement('img')
    mosquito.src = './img/mosca.png'
    mosquito.className= tamanhoRandomico() +' ' +lado()
    mosquito.style.position = "absolute"
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    document.body.appendChild(mosquito)
    mosquito.id = "mosquito"
    mosquito.onclick=function(){//Ao clicar no mosquito o mesmo e removido
        this.remove()
    }
}
posicaoRandomica()

//Tamanhos variados
function tamanhoRandomico(){
    var opcao = Math.floor(Math.random()*3)
    switch (opcao){
        case 0:
            return 'mosquito'
        case 1:
            return 'mosquito1'
        case 2:
            return 'mosquito2'
    }
}

//Ladoss variados
function lado(){
    var opcao = Math.floor(Math.random()*2)
    switch (opcao){
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}

//Criacao pausada do elemento
var criacao = setInterval(function(){
    posicaoRandomica()
}, tempomosquito)