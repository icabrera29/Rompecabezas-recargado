var Juego = function(){  

  this.crearGrilla = function(){
    var valor = 0;
    for(i = 0; i < this.cantidadDePiezasPorLado; i++){
      this.grilla[i] = [];
      for(j = 0; j < this.cantidadDePiezasPorLado; j++ ){
        this.grilla[i][j] = valor+1;
        valor+= 1;
      }
    }
  }

  this.piezaVacia = function(xPiezaVacia, yPiezaVacia){
    this.contexto.beginPath();
    this.contexto.rect(xPiezaVacia * this.anchoPiezas, yPiezaVacia * this.altoPiezas, this.altoPiezas, this.anchoPiezas);
    this.contexto.fillStyle = 'white';
    this.contexto.fill();
  }

  this.chequearSiGano = function(){
    for(var i = 0; i < this.grilla.length; i++){      
        for(var j = 0; j < this.grilla[i].length; j++){
          if(this.grilla[i][j] > this.grilla[i][j+1]){
             return false;                   
          }
        }
      }
      return true; 
    }
  
  this.mostrarCartelGanador = function(){
    swal(
        'Buen trabajo!',
        'Has ganado !',
        'success'
      )    
    }
  this.mostrarCartelPerdedor = function(){
    swal(
        'Que triste!',
        'Has perdido',
        'error'
      ) 
  }

  this.intercambiarPosiciones = function(filaPos1, columnaPos1, filaPos2, columnaPos2){
    var posicion1 = this.grilla[filaPos1][columnaPos1];
    var posicion2 = this.grilla[filaPos2][columnaPos2];
    this.grilla[filaPos1][columnaPos1] = posicion2;
    this.grilla[filaPos2][columnaPos2] = posicion1;

    var temp = [];
    temp = this.piezas[filaPos1][columnaPos1];
    this.piezas[filaPos1][columnaPos1] = this.piezas[filaPos2][columnaPos2];
    this.piezas[filaPos2][columnaPos2] = temp;
    
    this.construirPiezas();
    this.piezaVacia(filaPos2, columnaPos2);    
  }

  // Actualiza la posición de la pieza vacía
  this.actualizarPosicionVacia = function(nuevaFila,nuevaColumna){
    this.filaPosicionVacia = nuevaFila;
    this.columnaPosicionVacia = nuevaColumna;
  }
  // Para chequear si la posicón está dentro de la grilla.
  this.posicionValida = function(fila, columna){
    if((fila > -1 && fila < this.cantidadDePiezasPorLado) && (columna > -1 && columna < this.cantidadDePiezasPorLado)){
      return true;
    }else{
      return false;
    }
  }

  this.moverEnDireccion = function(direccion){
    var nuevaFilaPiezaVacia;
    var nuevaColumnaPiezaVacia;
    
    // Intercambia pieza blanca con la pieza que está arriba suyo
    if(direccion == 40){
      nuevaFilaPiezaVacia = this.filaPosicionVacia;
      nuevaColumnaPiezaVacia = this.columnaPosicionVacia-1;
    }
    // Intercambia pieza blanca con la pieza que está abajo suyo
    else if (direccion == 38) {
      nuevaFilaPiezaVacia = this.filaPosicionVacia;
      nuevaColumnaPiezaVacia = this.columnaPosicionVacia+1;

    }
    // Intercambia pieza blanca con la pieza que está a su izq
    else if (direccion == 39) {
      // Completar
      nuevaFilaPiezaVacia = this.filaPosicionVacia-1;
      nuevaColumnaPiezaVacia = this.columnaPosicionVacia;
    }
    // Intercambia pieza blanca con la pieza que está a su der
    else if (direccion == 37) {
      // Completar
      nuevaFilaPiezaVacia = this.filaPosicionVacia+1;
      nuevaColumnaPiezaVacia = this.columnaPosicionVacia;
    }
    
    
    if (this.posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
      this.intercambiarPosiciones(this.filaPosicionVacia, this.columnaPosicionVacia,
      nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
      this.actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    }
  }

  this.restarMovimientos = function(){
    if(this.contadorDeMovimientos > 1){
      this.contadorDeMovimientos--;
      document.getElementById("contadorDeMovimientos").innerHTML = this.contadorDeMovimientos;
    }else{
      this.mostrarCartelPerdedor();      
    }    
  }

  this.mezclarPiezas = function(veces){
    if(veces<=0){return;}
    var self = this;
    var direcciones = [40, 38, 39, 37];
    var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
    this.moverEnDireccion(direccion);
    setTimeout(function(){
      self.mezclarPiezas(veces-1);
    },50);
    
  }

  this.mezclarNuevamente = function(){
    self = this;
    $('#mezclarNuevamente').click(function(){
      var cantidadDeMezclas = Math.max(Math.pow(self.cantidadDePiezasPorLado, 3), 100);
      self.mezclarPiezas(cantidadDeMezclas);
      var valor =  $("input:checked").val(); 
      self.calcularMovimientosNivel(valor);
    });
  }

  this.capturarTeclas = function(){
    var self = this;
    document.body.onkeydown = (function(evento) {
      if(evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37){
        self.moverEnDireccion(evento.which);
        self.restarMovimientos();
        var gano = self.chequearSiGano();
        if(gano){
          setTimeout(function(){
            self.mostrarCartelGanador();  
          },500);
        } 
        evento.preventDefault();
      }
    });
  }
  
  this.configurarCanvas = function(){
    this.canvas = document.getElementById("miCanvas");
    this.contexto = this.canvas.getContext("2d");
  }
  
  this.iniciarPiezas = function(){
    for(var i = 0; i < this.cantidadDePiezasPorLado; i++){
      this.piezas[i] = [];
      for(var j = 0; j < this.cantidadDePiezasPorLado; j++){        
        this.piezas[i][j] = [];
        this.piezas[i][j].x = i;
        this.piezas[i][j].y = j;
      } 
    }
  }
  
  this.construirPiezas = function(){
    for(i = 0; i < this.cantidadDePiezasPorLado; i++){      
      for(j = 0; j < this.cantidadDePiezasPorLado; j++){   
        var x = this.piezas[i][j].x;
        var y = this.piezas[i][j].y;
        this.contexto.drawImage(this.imagen, x * this.anchoPiezas, y * this.altoPiezas, this.anchoPiezas, this.altoPiezas, i * this.anchoPiezas, j * this.altoPiezas, this.anchoPiezas, this.altoPiezas);       
      }
    }    
  }  


  this.cargarImagen = function (e) {
    //se calcula el ancho y el alto de las piezas de acuerdo al tamaño del canvas (600). 
    this.anchoPiezas = Math.floor(600 / this.cantidadDePiezasPorLado);
    this.altoPiezas = Math.floor(600 / this.cantidadDePiezasPorLado);
    //se calcula el ancho y alto del rompecabezas de acuerdo al ancho y alto de cada pieza y la cantidad de piezas por lado
    this.anchoDeRompecabezas = this.anchoPiezas * this.cantidadDePiezasPorLado;
    this.altoDeRompecabezas = this.altoPiezas * this.cantidadDePiezasPorLado;
    this.configurarCanvas();
  }

    //funcion que carga la imagen
  this.iniciarImagen = function (callback) {
    this.imagen = new Image();
    var self = this;
    //se espera a que se termine de cargar la imagen antes de ejecutar la siguiente funcion
    this.imagen.addEventListener('load', function () {
      self.cargarImagen.call(self);
      callback();
    }, false);
    this.imagen.src = "images/rompecabezasRecargado.jpg";
  }
  
  this.cambiarCantPiezas = function(){    
      //this.cantidadDePiezasPorLado = document.getElementById("cantidadPiezasPorLado").value;
      self = this;
    $('#cantidadPiezasPorLado').on('change', function(){
      self.cantidadDePiezasPorLado = $('#cantidadPiezasPorLado').value;
      self.iniciar();
    });
  }
  //Mover las piezas clickeando
  this.localizarClick = function(){
    self = this;
    document.getElementById('miCanvas').onmousemove = function(e){
    self.posicionClick.x = Math.floor((e.pageX - this.offsetLeft) / self.anchoPiezas);
    self.posicionClick.y = Math.floor((e.pageY - this.offsetTop) / self.altoPiezas);
    }
  }

  this.distancia = function(x1, y1, x2, y2){
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }  

  this.moverClick = function(){
    this.localizarClick();
    self = this;
    $('#miCanvas').click(function(){
      if (self.distancia(self.filaPosicionVacia, self.columnaPosicionVacia,
      self.posicionClick.x, self.posicionClick.y) == 1){
      self.intercambiarPosiciones(self.filaPosicionVacia, self.columnaPosicionVacia,
      self.posicionClick.x, self.posicionClick.y);
      self.actualizarPosicionVacia(self.posicionClick.x, self.posicionClick.y);
      self.restarMovimientos();
      }
    });
  }
  //Fin - Mover las piezas clickeando
  this.calcularMovimientosNivel = function(valorInput){
    this.movimientosTotales = (this.cantidadDePiezasPorLado * this.cantidadDePiezasPorLado) * valorInput;
    this.contadorDeMovimientos = this.movimientosTotales;
    document.getElementById("contadorDeMovimientos").innerHTML = this.contadorDeMovimientos;
  }

  this.cambiarNivel = function(){  
    self = this;    
    $( "input" ).on( "click", function(){   
      var valor =  $("input:checked").val();       
      self.calcularMovimientosNivel(valor);      
    });
  }

  //una vez elegido el nivel, se inicia el juego
  this.iniciar = function (cantMovimientos) {
    this.piezas = [];
    this.grilla = [];
    this.posicionClick = new Object;
    this.posicionClick.x = 0;
    this.posicionClick.y = 0;
    this.cantidadDePiezasPorLado = document.getElementById("cantidadPiezasPorLado").value;
    this.movimientosTotales = (this.cantidadDePiezasPorLado * this.cantidadDePiezasPorLado) * $("input:checked").val();
    this.contadorDeMovimientos = this.movimientosTotales;
    document.getElementById("contadorDeMovimientos").innerHTML = this.contadorDeMovimientos;
     
    this.crearGrilla();
   
    this.filaPosicionVacia = this.cantidadDePiezasPorLado - 1;
    this.columnaPosicionVacia = this.cantidadDePiezasPorLado - 1;
    var self = this;
    this.iniciarImagen(function (){
      self.iniciarPiezas();
      self.construirPiezas();
   
      self.piezaVacia(self.filaPosicionVacia, self.columnaPosicionVacia);
      var cantidadDeMezclas = Math.max(Math.pow(self.cantidadDePiezasPorLado, 3), 100);
      self.mezclarPiezas(cantidadDeMezclas);
      self.capturarTeclas();
      self.moverClick();
      self.cambiarCantPiezas();
      self.mezclarNuevamente();
      self.cambiarNivel();      
    });
  }
}


var juego = new Juego();
juego.iniciar();

