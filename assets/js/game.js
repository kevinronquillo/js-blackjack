const module = (() => {
    'use strict'

    let deck = [];
    const types = ['C', 'D', 'H', 'S'],
        specials = ['A', 'J', 'Q', 'K'];

    let playersPoints = [];
    //Refs
    const btnCall = document.querySelector('#btnCall'),
        btnStop = document.querySelector('#btnStop'),
        btnNew = document.querySelector('#btnNew');
    const divPlayerCards = document.querySelectorAll('.divCards'),
        pointsHtml = document.querySelectorAll('small');

    btnStop.disabled = true;
    btnCall.disabled = true;
    // Creates a new deck
    const iniDeck = () => {

        deck = [];
        playersPoints = [];
        for (let i = 2; i <= 10; i++) {
            for (let type of types)
                deck.push(i + type);

        }
        for (let type of types) {
            for (let esp of specials)
                deck.push(esp + type);
        }
        return _.shuffle(deck);

    }

    function clearBox(elementID) {
        while (elementID.firstChild) {
            elementID.removeChild(elementID.firstChild);
        }
    }

    const startGame = (players = 2) => {
        deck = [];
        deck = iniDeck();
        playersPoints = [];
        for (let i = 0; i < players; i++) {
            playersPoints.push(0);
        }

        pointsHtml.forEach(elem => elem.innerText = 0);
        divPlayerCards.forEach(elem => elem.innerHTML = '');

        btnCall.disabled = false;
        btnStop.disabled = true;
    }

    //This function lets you draw a card

    const drawCard = () => {

        if (deck.length === 0) {
            throw 'The deck is empty'
        }
        return deck.pop();
    }

    const cardValue = (card) => {

        const value = card.substring(0, card.length - 1);

        return (isNaN(value)) ?
            (value === 'A') ? 11 : 10
            : value * 1;
    }


    const totalPoints = (card, turn) => {

        playersPoints[turn] = playersPoints[turn] + cardValue(card);
        pointsHtml[turn].innerText = playersPoints[turn];
        return playersPoints[turn];

    }

    const createCard = (card, turn) => {

        const imgCard = document.createElement('img');
        imgCard.src = `assets/cards/${card}.png`;
        imgCard.classList.add('cards');
        divPlayerCards[turn].append(imgCard);

    }
    const winCalc = () => {

        const [minPoints, cpuPoints] = playersPoints;

        setTimeout(() => {
            if ((cpuPoints === 21) && (minPoints === 21)) {
                alert('Draw');
            } else if (minPoints > 21) {
                alert('Cpu Wins')
            } else if (cpuPoints > 21) {
                alert('Player Wins');
            } else {
                alert('Cpu Wins')
            }
        }, 100);
    }

    const cpuTurn = (minPoints) => {
        let cpuPoints = 0;
        do {
            const card = drawCard();

            cpuPoints = totalPoints(card, playersPoints.length - 1);

            createCard(card, playersPoints.length - 1);


        } while ((cpuPoints < minPoints) && (minPoints <= 21));

        winCalc();

    }
    //events
    btnCall.addEventListener('click', () => {
        btnStop.disabled = false;
        const card = drawCard();
        const playerPoints = totalPoints(card, 0);

        createCard(card, 0);

        if (playerPoints > 21) {
            btnCall.disabled = true;
            btnStop.disabled = true;
            cpuTurn(playerPoints);
        } else if (playerPoints === 21) {
            btnCall.disabled = true;
            btnStop.disabled = true;
            cpuTurn(playerPoints);
        }

    });

    btnStop.addEventListener('click', () => {

        btnCall.disabled = true;
        btnStop.disabled = true;
        cpuTurn(playersPoints[0]);

    })

    btnNew.addEventListener('click', () => {
        startGame();
    })

    return {
        newGame: startGame
    };


})();