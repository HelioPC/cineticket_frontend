import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cinema from 'App/Models/Cinema'
import Rua from 'App/Models/Rua'

export default class CinemasController {
  public async create ({ request, response }: HttpContextContract) {
    const { nome, rua } = request.only([ 'nome', 'rua' ])

    try {
      const novoCinema = await Cinema.create({
        nome: nome,
        id_rua: rua,
      })

      response.status(201)
      return {
        status: 'sucesso',
        data: novoCinema,
        message: 'sucesso ao criar cinema',
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'falha ao criar cinema',
      }
    }
  }

  public async show ({ response }: HttpContextContract) {
    try {
      const cinemas = await Cinema.all()

      if(cinemas) {
        response.status(200)
        return {
          status: 'sucesso',
          data: await Promise.all(cinemas.map(async (cinema) => {
            let rua = await Rua.find(cinema.id_rua)

            return {
              ID_CINEMA: cinema.id,
              NOME: cinema.nome,
              LOCALIZACAO: rua?.nome,
            }
          })),
          message: 'sucesso ao listar cinemas',
        }
      } else {
        response.status(204)
        return {
          status: 'sucesso',
          data: [],
          message: 'sem cinemas',
        }
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'erro ao listar as cinemas',
      }
    }
  }

  public async showById ({ response, params }: HttpContextContract) {
    try {
      const cinema = await Cinema.find(params.id)

      if(cinema) {
        let rua = await Rua.find(cinema.id_rua)
        response.status(200)

        return {
          status: 'sucesso',
          data: {
            ID_CINEMA: cinema.id,
            NOME: cinema.nome,
            LOCALIZACAO: rua?.nome,
          },
          message: 'sucesso ao encontrar o cinema',
        }
      } else {
        response.status(204)
        return {
          status: 'sucesso',
          data: [],
          message: 'sem cinema',
        }
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'erro ao encontrar o cinema',
      }
    }
  }
}
