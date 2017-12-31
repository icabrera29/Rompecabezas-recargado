var expect = chai.expect;
var assert = chai.assert;

describe('Creacion', function(){
	it('El objeto juego esta definido', function(){
		var juego = new Juego();
		assert.isObject(juego, 'El objeto Juego esta definido');
	})
	it('Funcion que crea una grilla segun la cantidad de piezas', function(){
		juego.cantidadDePiezasPorLado = 3;
		juego.crearGrilla();
		expect(juego.grilla).to.have.lengthOf(juego.cantidadDePiezasPorLado);
		for(i = 0; i < juego.cantidadDePiezasPorLado; i++){
			expect(juego.grilla[i]).to.have.lengthOf(juego.cantidadDePiezasPorLado);
		}
	})
	it('Posicion válida - true', function(){
		expect(juego.posicionValida(1,1)).to.be.true;
	})
	it('Posicion válida - false', function(){
		expect(juego.posicionValida(4,2)).to.be.false;
	})
	it('Iniciar array piezas segun cantidad de piezas', function(){
		juego.cantidadDePiezasPorLado = 3;
		juego.iniciarPiezas();
		expect(juego.piezas).to.have.lengthOf(juego.cantidadDePiezasPorLado);
	})
	it('Chequea que las Keys x, y existen en el array piezas[][]', function(){
		juego.cantidadDePiezasPorLado = 3;
		juego.iniciarPiezas();
		for(i = 0; i < juego.cantidadDePiezasPorLado; i++){
			for(j = 0; j < juego.cantidadDePiezasPorLado; j++){
				expect(juego.piezas[i][j]).to.have.all.keys('x', 'y');
			}			
		}		
	})
	it('Actualiza posicion vacia', function(){
		juego.filaPosicionVacia = 3;
    	juego.columnaPosicionVacia = 3;
    	juego.actualizarPosicionVacia(2,2);
    	expect(juego.filaPosicionVacia).to.equal(2);
		expect(juego.columnaPosicionVacia).to.equal(2);			
	})
});
