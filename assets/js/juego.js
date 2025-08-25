
/**
 * C: clover = trebol
 * D: diamonts = diamantes
 * H: hearts = Corazones
 * E: spades = Espadas
*/

// PATRON MÓDULO: Función anonima autoinvocada: crea un nuevo scope el cual no tiene una referencia por nombre
(() => {

    let deck         = [];
    const tipos      = [ 'C', 'D', 'H', 'S' ],
          especiales = ['A', 'J', 'Q', 'K']
    
    let puntosJugador      = 0,
        puntosComputadora  = 0;

    // let puntosJugadores = [];
    
    // Referencias del HTML
    const mostrarPuntos         = document.querySelectorAll('small'),
          divCartasJugadores    = document.querySelector('#jugador-cartas'),
          divCartasComputadora  = document.querySelector('#computador-cartas'),
          btnNuevo              = document.querySelector('#btnNuevo'),
          btnPedir              = document.querySelector('#btnPedir'),
          btnDetener            = document.querySelector('#btnDetener');

    // Función para inicializar el juego
    const inicializarJuego = ( numJugadores = 2 ) => {
      deck = crearDeck()
    }

    // const puntosComputadora = puntosJugadores.length - 1
    
    
    // Crea nuevo deck
    const crearDeck = () => {
      
        deck = [];
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
    
        return _.shuffle( deck )
    }

    // crearDeck()
    
    
    // Esta función me permite tomar una carta
    const pedirCarta = () => {
    
        if(deck.length === 0) throw new Error('No hay cartas en el deck') 
        // Vamos a tomar la ultima carta del maso 
        return deck.pop()
    }
    
    const valorCarta = ( carta ) => {
        
        const valor = carta.substring( 0, carta.length - 1 );
        return ( isNaN(valor)) ? 
                (valor === 'A') ? 11 : 10
                : valor * 1;
    }
    
    // Turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {
    
         do {
            const carta = pedirCarta()
    
            puntosComputadora = puntosComputadora + valorCarta( carta )
            
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
        
        puntosJugador = puntosJugador + valorCarta( carta )

        mostrarPuntos[0].innerHTML = `<b>${puntosJugador}</b>`

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores.append( imgCarta )
    
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
                title: "Ganaste!",
                icon: "success",
                draggable: true
            });
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

    inicializarJuego()
    
    // Función nuevo juego
    btnNuevo.addEventListener('click', () => {
        inicializarJuego()
        location.reload()
    })

})();