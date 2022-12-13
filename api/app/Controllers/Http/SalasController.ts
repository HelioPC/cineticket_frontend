import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Sala from 'App/Models/Sala'

export default class SalasController {
  public async create ({ request, response }: HttpContextContract) {
    const { numero, capacidade, cinema } = request.only([ 'numero', 'capacidade', 'cinema' ])

    try {
      const novaSala = await Sala.create({
        numero,
        capacidade,
        id_cinema: cinema,
      })

      response.status(201)
      return {
        status: 'sucesso',
        data: novaSala,
        message: 'sucesso ao criar sala',
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'falha ao criar sala',
      }
    }
  }

  public async show ({ response }: HttpContextContract) {
    try {
      const salas = await Sala.all()

      if(salas) {
        response.status(200)
        return {
          status: 'sucesso',
          data: salas.map(async (sala) => {
            return {
              ID_SALA: sala.id,
              ID_CINEMA: sala.id_cinema,
              NUMERO: sala.numero,
              CAPACIDADE: sala.capacidade,
            }
          }),
          message: 'sucesso ao listar salas',
        }
      } else {
        response.status(204)
        return {
          status: 'sucesso',
          data: [],
          message: 'sem salas',
        }
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'erro ao listar as salas',
      }
    }
  }

  public async showById ({ response, params }: HttpContextContract) {
    try {
      const sala = await Sala.find(params.id)

      if(sala !== null) {
        response.status(200)
        return {
          status: 'sucesso',
          data: {
            ID_SALA: sala.id,
            ID_CINEMA: sala.id_cinema,
            NUMERO: sala.numero,
            CAPACIDADE: sala.capacidade,
          },
          message: 'sucesso ao encontrar o sala',
        }
      } else {
        response.status(206)
        return {
          status: 'sucesso',
          data: [],
          message: 'sem sala',
        }
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'erro ao encontrar o sala',
      }
    }
  }

  public async showByCinemaId ({ response, params }: HttpContextContract) {
    try {
      const salas = await Database.query().from('salas').select('*').where('id_cinema', params.id)

      if(salas !== null) {
        response.status(200)
        return {
          status: 'sucesso',
          data: salas.map((sala) => {
            return {
              ID_SALA: sala.id,
              ID_CINEMA: sala.id_cinema,
              NUMERO: sala.numero,
              CAPACIDADE: sala.capacidade,
            }
          }),
          message: 'sucesso ao encontrar o sala',
        }
      } else {
        response.status(206)
        return {
          status: 'sucesso',
          data: [],
          message: 'sem sala',
        }
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'erro ao encontrar o sala',
      }
    }
  }
}
