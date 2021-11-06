/*
    - 2C = Two of Clubs 
    - 2D = Two of Diamonds
    - 2H = Two of Hearts
    - 2S = Two of Spades
*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;


const smallTags =  document.querySelectorAll('small');
const btnNuevo = document.querySelector('#btnNuevo');
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const divCartasJugador =  document.querySelector('#jugador-carta');
const divCartasComputadora = document.querySelector('#computadora-carta');

const crearDeck = () => {

    for( let i = 2; i <= 10; i++) {
        for(let tipo of tipos) {
            deck.push( i + tipo);
        }
    }

    for( let tipo of tipos) {
        for(let especial of especiales) {
            deck.push(especial + tipo);
        }
    }
    deck = _.shuffle( deck );
    console.log(deck);

    return deck;
}

crearDeck();


const pedirCarta = () => {
    if(deck.length === 0) {
        throw 'No hay cartas';
    } else {
        const carta = deck.pop();
        console.log(carta);
        console.log(deck)
        return carta;
    }
    
}



const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN(valor) )
            ? (valor === 'A')
                ? 11
                : 10
            : valor * 1;
}


const mensajeJuego = (puntosJugador, puntosComputadora) => {
    if(puntosJugador === puntosComputadora) {
        alert('Nadie Gana');
    } else if(puntosJugador > 21) {
        alert('Computadora gana!');
    } else if(puntosComputadora > 21) {
        alert('HAZ GANADO!!!');
    }
};

const turnoComputadora = ( puntosMinimos ) => {
    do {
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta( carta );
        smallTags[1].innerHTML = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `./assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append( imgCarta );

        if( puntosMinimos > 21) {
            break;
        } 

    } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout(() => {
        mensajeJuego(puntosJugador, puntosComputadora);
    }, 1000)
};


btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta( carta );
    smallTags[0].innerHTML = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `./assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    if( puntosJugador > 21) {
        console.warn('Perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );

    } else if( puntosJugador === 21) {
        console.warn('21!!!');
        btnPedir.disabled = true;
        btnDetener.disabled =  true;
        turnoComputadora( puntosComputadora );
    }
});



btnDetener.addEventListener('click', () => {
    btnDetener.disabled = true;
    btnPedir.disabled = true;

    turnoComputadora(puntosJugador);
});


btnNuevo.addEventListener('click', () => {
    deck = [];
    crearDeck();

    btnPedir.disabled =  false;
    btnDetener.disabled = false;

    puntosComputadora = 0;
    puntosJugador = 0;

    smallTags[0].innerText = puntosJugador;
    smallTags[1].innerText = puntosComputadora;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

});