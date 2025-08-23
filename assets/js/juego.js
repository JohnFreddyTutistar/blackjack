let deck = [];

const tipos = [ 'C', 'D', 'H', 'E' ]

const especiales = ['A', 'J', 'Q', 'K']

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

    console.log(deck);

    deck = _.shuffle( deck )
    console.log(deck);

}

crearDeck()