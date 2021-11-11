
const BlackJack = (() => {
    'use strict'

    /*
    - 2C = Two of Clubs 
    - 2D = Two of Diamonds
    - 2H = Two of Hearts
    - 2S = Two of Spades
*/

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];


    const smallTags = document.querySelectorAll('small'),
          btnNuevo = document.querySelector('#btnNuevo'),
          btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener');


    const divCartasJugadores = document.querySelectorAll('.divCartas');


    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();
        puntosJugadores = [];

        for( let i = 0; i<numJugadores; i++) {
            puntosJugadores.push(0);
        }

        smallTags.forEach( elem => elem.innerHTML = 0);
        divCartasJugadores.forEach( elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    };

    const crearDeck = () => {

        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(especial + tipo);
            }
        }
       

        return _.shuffle(deck);
    }



    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas';
        } else {

            return deck.pop();
        }

    }



    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor))
            ? (valor === 'A')
                ? 11
                : 10
            : valor * 1;
    }


    const mensajeJuego = (puntosJugador, puntosComputadora) => {
        if (puntosJugador === puntosComputadora) {
            alert('Nadie Gana');
        } else if (puntosJugador > 21) {
            alert('Computadora gana!');
        } else if (puntosComputadora > 21) {
            alert('HAZ GANADO!!!');
        } else  if((puntosJugador > puntosComputadora) && puntosJugador < 21 ) {
            alert('HAZ GANADO!!')
        } else if(puntosJugador === 21) {
            alert('HAZ GANADO');
        } else {
            alert('Computadora Gana!!');
        }
    };

    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        smallTags[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    };

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `./assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    };

    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos( carta, puntosJugadores.length - 1 );
            crearCarta(carta, puntosJugadores.length - 1);

        } while (puntosMinimos < 21 && puntosComputadora <= 21);

        setTimeout(() => {
            mensajeJuego(puntosJugadores[0], puntosJugadores[puntosJugadores.length - 1]);
        }, 1000)
    };


    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta(),
              puntosJugador  =  acumularPuntos( carta, 0);

        crearCarta( carta, 0);

        if (puntosJugador > 21) {
            console.warn('Perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        } else if (puntosJugador === 21) {
            console.warn('21!!!');
            setTimeout(() => {
                alert('21!!!');
            },1000);
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });



    btnDetener.addEventListener('click', () => {
        btnDetener.disabled = true;
        btnPedir.disabled = true;

        turnoComputadora(puntosJugadores[puntosJugadores.length - 1]);
    });


    btnNuevo.addEventListener('click', () => {
    
        inicializarJuego();

    });

    return {
        inicializarJuego
    };
})();