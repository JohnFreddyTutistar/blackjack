
/**
 * C: clover = trebol
 * D: diamonts = diamantes
 * H: hearts = Corazones
 * E: spades = Espadas
*/
const tipos      = [ 'C', 'D', 'H', 'S' ]
const especiales = ['A', 'J', 'Q', 'K']

let puntosJugador      = 0;
    puntosComputadora  = 0;

// Referencias del HTML
const mostrarPuntos         = document.querySelectorAll('small');
const divCartasJugador      = document.querySelector('#jugador-cartas')
const divCartasComputadora  = document.querySelector('#computador-cartas')
const btnDetener            = document.querySelector('#btnDetener');
const btnNuevo              = document.querySelector('#btnNuevo');

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
const turnoComputadora = ( puntosMinimos ) => {

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
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Perdiste, intentalo nuevamente",
        });
        btnPedir.disabled   = true
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador )
    } else if (puntosJugador === 21) {
        Swal.fire({
            title: "Drag me!",
            icon: "success",
            draggable: true
        });
        console.warn('genial')
        btnPedir.disabled   = true
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador )
    }


})

// función para detener el juego
btnDetener.addEventListener('click', () => {

    if(puntosJugador <= 21){ 
        btnDetener.disabled = true;
        btnPedir.disabled = true;
        turnoComputadora( puntosJugador )
        if( puntosComputadora === puntosJugador ) {
            Swal.fire({
                title: "Empate. nadie gana",
                icon: "alert",
                draggable: true
            });
        } else if( (puntosComputadora > puntosJugador)  && (puntosComputadora <= 21) ){
            Swal.fire({
                title: "Conputadora gana",
                icon: "success",
                draggable: true
            });
        } else {
            Swal.fire({
                title: "Felicitaciones, jugador gana",
                icon: "success",
                draggable: true
            });
        }
    }

})

// Función nuevo juego
btnNuevo.addEventListener('click', () => {
    location.reload()
})


// TODO Borrar
