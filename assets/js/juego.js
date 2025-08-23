
/**
 * C: clover = trebol
 * D: diamonts = diamantes
 * H: hearts = Corazones
 * E: spades = Espadas
*/
const tipos = [ 'C', 'D', 'H', 'E' ]

// Cartas especiales
const especiales = ['A', 'J', 'Q', 'K']

let deck = [];

// Crea nuevo deck
const crearDeck = () => {
  
    for(let i = 2; i <= 10; i++){
        for(let tipo of tipos){
            deck.push(i + tipo)
        }
    }

    for( tipo of tipos ){
        for( especial of especiales){
            deck.push(especial + tipo)
        }
    } 

    // console.log(deck);

    deck = _.shuffle( deck )
    console.log(deck);

    return deck

}

crearDeck()

// Esta función me permite tomar una carta
const pedirCarta = () => {

    if(deck.length === 0) throw new Error('No hay cartas en el deck') 
    
    const carta = deck.pop();


    console.log(deck)

    console.log(carta)

  return carta
}

pedirCarta()

const valorCarta = ( carta ) => {
    
    const valor = carta.substring( 0, carta.length - 1 );
    return ( isNaN(valor)) ? 
            (valor === 'A') ? 11 : 10
            : valor * 1;
}

const valor = valorCarta( pedirCarta() );
console.log({ valor }) 
