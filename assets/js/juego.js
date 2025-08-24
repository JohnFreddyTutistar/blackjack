
/**
 * C: clover = trebol
 * D: diamonts = diamantes
 * H: hearts = Corazones
 * E: spades = Espadas
*/
const tipos = [ 'C', 'D', 'H', 'S' ]
// Cartas especiales
const especiales = ['A', 'J', 'Q', 'K']

let puntosJugador = 0;
    puntosComputadora = 0;

// Referencias del HTML
const mostrarPuntos = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputadora = document.querySelector('#computador-cartas')

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

    return deck

}

crearDeck()

// Esta función me permite tomar una carta
const pedirCarta = () => {

    if(deck.length === 0) throw new Error('No hay cartas en el deck') 
    
    const carta = deck.pop();

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

// Turno de la computadora
const turnoComputadore = ( puntosMinimos ) => {

     do {
        const carta = pedirCarta()

        puntosComputadora = puntosComputadora + valorCarta( carta );

        mostrarPuntos[1].innerHTML = `<b>${puntosComputadora}</b>`

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`
        imgCarta.classList.add('carta')
        divCartasComputadora.append(imgCarta)

        if( puntosMinimos > 21 ){
            break;
        }

     } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) )

}


// Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    console.log('carta seleccionada: ', carta)

    puntosJugador = puntosJugador + valorCarta( carta );

    mostrarPuntos[0].innerHTML = `<b>${puntosJugador}</b>`

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`
    imgCarta.classList.add('carta')
    divCartasJugador.append(imgCarta)

    if( puntosJugador>21 ){
        console.warn('perdiste')
        btnPedir.disabled = true
        turnoComputadore()
    } else if (puntosJugador === 21) {
        console.warn('genial')
        btnPedir.disabled = true
    }


})


// TODO Borrar
