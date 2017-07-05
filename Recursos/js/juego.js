// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Ac&aacute; vamos a ir guardando la posición vacía
var posicionVacia = {
  fila:2,
  columna:2
};

// Esta función va a chequear si el Rompecabezas est&aacute; en la posición ganadora
function chequearSiGano(){

  return grillaGanadora();
}


// la hacen los alumnos, pueden mostrar el cartel como prefieran. Pero es importante que usen
// esta función
function mostrarCartelGanador(){
  alert("¡Enhorabuena haz ganado!");
}

function grillaGanadora(){

  var cantidadFilas = grilla[0].length;
  var cantidadColumnas = grilla[0].length;
  var ultimoValorVisto = 0;
  var valorActual = 0;

  for(var fila=0; fila < cantidadFilas; fila++){
    for(var columna = 0; columna < cantidadColumnas; columna++){
      valorActual = grilla[fila][columna]

      if(valorActual < ultimoValorVisto) return false;


      ultimoValorVisto = valorActual;
    }
  }

  return true;
}

// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2){

  var pieza1 = grilla[fila1][columna1];
  var pieza2 = grilla[fila2][columna2];
  
  grilla[fila1][columna1] = pieza2;
  grilla[fila2][columna2] = pieza1;

  var elementoPieza1 = document.getElementById('pieza'+pieza1);
  var elementoPieza2 = document.getElementById('pieza'+pieza2);

  var padre = elementoPieza1.parentNode;

  var clonElemento1 = elementoPieza1.cloneNode(true);
  var clonElemento2 = elementoPieza2.cloneNode(true);

  padre.replaceChild(clonElemento1, elementoPieza2);
  padre.replaceChild(clonElemento2, elementoPieza1);


 }



// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila,nuevaColumna){

 posicionVacia.fila = nuevaFila;
 posicionVacia.columna = nuevaColumna;

}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna){

  return (fila < 3 && columna < 3) && (fila > -1 && columna > -1);
}


// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
// su posición con otro elemento
function moverEnDireccion(direccion){

  var nuevaFilaPiezaBlanca;
  var nuevaColumnaPiezaBlanca;


  if(direccion == 40){
    nuevaFilaPiezaBlanca = posicionVacia.fila+1;
    nuevaColumnaPiezaBlanca = posicionVacia.columna;
  }
  else if (direccion == 38) {
    nuevaFilaPiezaBlanca = posicionVacia.fila-1;
    nuevaColumnaPiezaBlanca = posicionVacia.columna;

  }
  else if (direccion == 39) {
    nuevaFilaPiezaBlanca = posicionVacia.fila;
    nuevaColumnaPiezaBlanca = posicionVacia.columna+1;

  }
  else if (direccion == 37) {
    nuevaFilaPiezaBlanca = posicionVacia.fila;
    nuevaColumnaPiezaBlanca = posicionVacia.columna-1;
  }

  if (posicionValida(nuevaFilaPiezaBlanca, nuevaColumnaPiezaBlanca)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
    nuevaFilaPiezaBlanca, nuevaColumnaPiezaBlanca);
    actualizarPosicionVacia(nuevaFilaPiezaBlanca, nuevaColumnaPiezaBlanca);
  }

}



// Extras, ya vienen dadas

function mezclarPiezas(veces){
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
}

function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    moverEnDireccion(evento.which);

    var gano = chequearSiGano();
    if(gano){
      setTimeout(function(){
        mostrarCartelGanador();  
      },500);
    } 
    evento.preventDefault();
  })
}

function iniciar(){
  mezclarPiezas(100);
  capturarTeclas();
}


iniciar();