var inquirer = require('inquirer')

function createFactura(folio, subtotal, description){
  var factura = new Object()
  factura.folio = folio
  factura.subtotal = subtotal
  factura.description = description
  return factura
}

var array = [
  new createFactura('F1', 100, 'Macchiato'),
  new createFactura('F2', 101, 'Frapuccino'),
  new createFactura('F3', 102, 'Latte'),
  new createFactura('F4', 103, 'Caramel'),
  new createFactura('F5', 104, 'Americano'),
  new createFactura('F6', 105, 'Capuccino'),
  new createFactura('F7', 106, 'Express'),
  new createFactura('F8', 107, 'Double'),
  new createFactura('F9', 108, 'Mocha'),
  new createFactura('F10', 109, 'Te')
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

