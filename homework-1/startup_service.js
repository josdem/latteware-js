/*
 * Hacer un programa(archivo de Node.js) que contenga un array de 10 objects, en el cual cada objeto representa un asistente a un Startup Weekend.
 * Cada asistente de startup weekend deberá de tener nombre, email, perfil (negocios, diseño o programador), ciudad de origen y edad.
 *
 * Usando Inquirer, hacer que el programa pregunte que tipo de perfil deseamos consultar y basado en este perfil,
 * el programa deberá de imprimir en terminal a todos los asistentes de ese perfil.
 *
 * author: josdem
 */

var inquier = require('inquirer')

var AssistantType = {
  BUSINESS: 0,
  DESIGN: 1,
  PROGRAMMER: 2,
  properties: {
    0: {question: "Hay el siguiente número de personas de negocio:"},
    1: {question: "Hay el siguiente número de personas de diseño:"},
    2: {question: "Hay el siguiente número de personas de programación:"}
  }
}

function createAssistant(name, email, type, city, age){
  var assistant = new Object()
  assistant.name = name
  assistant.email = email
  assistant.type = type
  assistant.city = city
  assistant.age = age
  return assistant
}

var array = [
  createAssistant('josdem', 'josdem@email.com', AssistantType.PROGRAMMER, 'Mexico City', 35),
  createAssistant('Miriam', 'mirian@email.com', AssistantType.BUSINESS, 'Mexico City', 33),
  createAssistant('Gael', 'gael@email.com', AssistantType.PROGRAMMER, 'Toluca', 18),
  createAssistant('Margarita', 'margarita@email.com', AssistantType.BUSINESS, 'Mexico City', 24),
  createAssistant('Diana', 'diana@email.com', AssistantType.DESIGN, 'Mexico City', 26),
  createAssistant('Juan', 'juan@email.com', AssistantType.PROGRAMMER, 'Mexico City', 35),
  createAssistant('Alexis', 'alexis@email.com', AssistantType.BUSINESS, 'Mexico City', 44),
  createAssistant('Guillermo', 'guillermo@email.com', AssistantType.DESIGN, 'Oaxaca', 36),
  createAssistant('Araceli', 'araceli@email.com', AssistantType.BUSINESS, 'Mexico City', 29),
  createAssistant('Danna', 'danna@email.com', AssistantType.PROGRAMMER, 'Mexico City', 18)
]

var questions = [{
  type:'input',
  name:'type',
  message:'¿Qué tipo de perfil deseas consultar? (0:negocios, 1:diseño, 2:programador)'
}]

function getTotalAssistantsByType(type){
  var counter = 0

  array.forEach(function(assistant){
    if(assistant.type == type){
      counter++
    }
  })

  return counter
}

inquier.prompt(questions, function(answer){
  var response = Number.parseInt(answer.type)
  console.log(AssistantType.properties[response].question, getTotalAssistantsByType(response))
})
