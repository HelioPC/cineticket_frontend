import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente'
// import Cliente from 'App/Models/Cliente'

export default class ClientesController {
  public async create ({ request, response }: HttpContextContract) {
    const { nome, telefone } = request.only([ 'nome', 'telefone' ])

    try {
      const cli = await Cliente.create({
        nome,
        telefone,
      })

      console.log({ nome, telefone })

      response.status(201)
      return {
        status: 'sucesso',
        data: cli,
        message: 'sucesso ao criar cliente',
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'falha ao criar cliente',
      }
    }
  }

  public async show ({ response }: HttpContextContract) {
    try {
      const clientes = await Cliente.all()

      if(clientes) {
        response.status(200)
        return {
          status: 'sucesso',
          data: clientes,
          message: 'sucesso ao listar clientes',
        }
      } else {
        response.status(204)
        return {
          status: 'sucesso',
          data: [],
          message: 'sem clientes',
        }
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'erro ao listar as clientes',
      }
    }
  }

  public async showById ({ response, params }: HttpContextContract) {
    try {
      const cliente = await Cliente.find(params.id)

      if(cliente) {
        response.status(200)
        return cliente
      } else {
        response.status(204)
        return {}
      }
    } catch (error) {
      return {
        error: true,
        msg: error,
      }
    }
  }
}
