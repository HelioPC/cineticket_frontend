import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cidade from 'App/Models/Cidade'

export default class CidadesController {
  public async create ({ request, response }: HttpContextContract) {
    const { nome } = request.only([ 'nome' ])

    try {
      const novaCidade = await Cidade.create({
        nome,
      })

      response.status(201)
      return {
        status: 'sucesso',
        data: novaCidade,
        message: 'sucesso ao criar cidade',
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'falha ao criar cidade',
      }
    }
  }

  public async show ({ response }: HttpContextContract) {
    try {
      const cidades = await Cidade.all()

      if(cidades) {
        response.status(200)
        return {
          status: 'sucesso',
          data: cidades.map((cidade) => {
            return {
              ID_CIDADE: cidade.id,
              NOME: cidade.nome,
            }
          }),
          message: 'sucesso ao listar cidades',
        }
      } else {
        response.status(204)
        return {
          status: 'sucesso',
          data: [],
          message: 'sem cidades',
        }
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'erro ao listar as cidades',
      }
    }
  }

  public async showById ({ response, params }: HttpContextContract) {
    try {
      const cidade = await Cidade.find(params.id)

      if(cidade) {
        response.status(200)
        return {
          ID_CIDADE: cidade.id,
          NOME: cidade.nome,
        }
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
