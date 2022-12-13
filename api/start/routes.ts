/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async () => {
    return {
      msg: 'Cineticket Adonis API 🚀',
    }
  })

  Route.group(() => {
    Route.get('/', 'ClientesController.show')
    Route.get('/:id', 'ClientesController.showById')
    Route.post('/', 'ClientesController.create')
  }).prefix('clientes')

  Route.group(() => {
    Route.get('/', 'FilmesController.show')
    Route.get('/exibicao', 'FilmesController.exibicao')
    Route.get('/:id/sessions', 'FilmesController.sessions')
    Route.get('/:id', 'FilmesController.showById')

    Route.post('/', 'FilmesController.create')
  }).prefix('filmes')

  Route.group(() => {
    Route.get('/', 'CidadesController.show')
    Route.get('/:id', 'CidadesController.showById')
    Route.post('/', 'CidadesController.create')
  }).prefix('cidades')

  Route.group(() => {
    Route.get('/', 'RuasController.show')
    Route.get('/:id', 'RuasController.showById')
    Route.post('/', 'RuasController.create')
  }).prefix('ruas')

  // Cinema's routes
  Route.group(() => {
    Route.get('/', 'CinemasController.show')
    Route.get('/:id', 'CinemasController.showById')
    Route.post('/', 'CinemasController.create')
  }).prefix('cinemas')

  // Sala's routes
  Route.group(() => {
    Route.get('/', 'SalasController.show')
    Route.get('/:id', 'SalasController.showById')
    Route.get('/cinema/:id/', 'SalasController.showByCinemaId')
    Route.post('/', 'SalasController.create')
  }).prefix('salas')

  // Funcionario's routes
  Route.group(() => {
    Route.get('/', 'FuncionariosController.show')
    Route.get('/:id', 'FuncionariosController.showById')
    Route.post('/', 'FuncionariosController.create')
  }).prefix('funcionarios')
  Route.post('/login', 'FuncionariosController.login')

  // Session's routes
  Route.group(() => {
    Route.get('/', 'SessoesController.show')
    Route.get('/:id/lugares', 'SessoesController.lugares')
    Route.get('/:id', 'SessoesController.showById')
    Route.post('/', 'SessoesController.create')
    Route.post('/exists', 'SessoesController.exists')
  }).prefix('sessions')

  Route.group(() => {
    Route.get('/', 'ReservasController.show')
    Route.get('/:id', 'ReservasController.showById')
    Route.post('/', 'ReservasController.make')
  }).prefix('reservas')
}).prefix('cineticket')

Route.get('*', () => {
  return {
    msg: 'Invalid route, try with "cineticket" prefix 🚀'
  }
})
