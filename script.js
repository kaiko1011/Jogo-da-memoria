const cards = document.querySelectorAll('.card');
let acertos= document.querySelector('#acertos');
let fimDeJogo=document.querySelector('#gameOver');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let contador= 0;
//função para virar carta
function flipCard() {
    
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

//função que checa se as cartas são iguais
function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        confirmaAcerto();
    window.setTimeout(function(){    
            limpaTela();
    },1000);    
        disableCards();
        return;
    }

    unflipCards();
}
//função que confirma o acerto
function confirmaAcerto(){
    acertos.style.zIndex= 10;
    acertos.style.top= 150+"px";
    acertos.style.opacity= 1;
    
}

function limpaTela(){
        acertos.style.zIndex= -10;
        acertos.style.top= 200+"px";
        acertos.style.opacity= 0;  
}    

//função que desabilita as cartas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
    contador+= 1;
    if(contador===6){
        telaFinal();
    }
    
}

function telaFinal(){
    fimDeJogo.style.zIndex= 15;
    fimDeJogo.style.opacity= 1;
}

//funcão que desvira as cartas
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//função que reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//função que embaralha as cartas
(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })
})();

//adiciona evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});
