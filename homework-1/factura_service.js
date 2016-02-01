/*
 * Hacer un programa(archivo de Node.js) que inicie con un array de 10 objects, en el cual cada objeto representa una factura.
 * Cada factura debe de tener una descripción, un costo antes de I.V.A. y folio. Pueden agregar cuantos atributos extra deseen a su objetos facturas.
 * Hacer una function que calcule el total de las facturas antes de I.V.A, el total del I.V.A de todas las facturas y el total de las facturas incluyendo I.V.A.
 * Esta función deberá regresar un objeto con estos 3 valores. Una vez que tengan estos valores, imprimirlos en terminal.
 *
 * author: josdem
 */

function createFactura(folio, subtotal, description){
  var factura = new Object()
  factura.folio = folio
  factura.subtotal = subtotal
  factura.description = description
  return factura
}

var array = [
  createFactura('F1', 100, 'Macchiato'),
  createFactura('F2', 101, 'Frapuccino'),
  createFactura('F3', 102, 'Latte'),
  createFactura('F4', 103, 'Caramel'),
  createFactura('F5', 104, 'Americano'),
  createFactura('F6', 105, 'Capuccino'),
  createFactura('F7', 106, 'Express'),
  createFactura('F8', 107, 'Double'),
  createFactura('F9', 108, 'Mocha'),
  createFactura('F10', 109, 'Te')
]

function getTotals(){
  var subtotal = 0
  var iva = 0

  array.forEach(function(factura){
    subtotal += factura.subtotal
    iva += factura.subtotal * 0.16
  })

  var totals = {
    subtotal: subtotal,
    iva: iva,
    total: subtotal + iva
  }
  return totals
}

console.log('Totales:', getTotals())

