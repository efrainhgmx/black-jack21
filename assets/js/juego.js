/*
    - 2C = Two of Clubs 
    - 2D = Two of Diamonds
    - 2H = Two of Hearts
    - 2S = Two of Spades
*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

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