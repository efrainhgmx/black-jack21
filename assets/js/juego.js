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
const btnPedir = document.querySelector('#btnPedir');
const divCartasJugador =  document.querySelector('#jugador-carta');

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

const valor = valorCarta(pedirCarta());
console.log({ valor });


btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta( carta );
    smallTags[0].innerHTML = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `./assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );
});