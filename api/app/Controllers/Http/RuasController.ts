import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Rua from 'App/Models/Rua'

export default class RuasController {
  public async create ({ request, response }: HttpContextContract) {
    const { nome, cidade } = request.only([ 'nome', 'cidade' ])

    try {
      const novaRua = await Rua.create({
        nome: nome,
        id_cidade: cidade,
      })

      response.status(201)
      return {
        status: 'sucesso',
        data: novaRua,
        message: 'sucesso ao criar rua',
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'falha ao criar rua',
      }
    }
  }

  public async show ({ response }: HttpContextContract) {
    try {
      const ruas = await Rua.all()

      if(ruas) {
        response.status(200)
        return {
          status: 'sucesso',
          data: ruas.map((rua) => {
            return {
              ID_RUA: rua.id,
              ID_CIDADE: rua.id_cidade,
              NOME: rua.nome,
            }
          }),
          message: 'sucesso ao listar ruas',
        }
      } else {
        response.status(204)
        return {
          status: 'sucesso',
          data: [],
          message: 'sem ruas',
        }
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'erro ao listar as ruas',
      }
    }
  }

  public async showById ({ response, params }: HttpContextContract) {
    try {
      const rua = await Rua.find(params.id)

      if(rua) {
        response.status(200)
        return {
          ID_RUA: rua.id,
          ID_CIDADE: rua.id_cidade,
          NOME: rua.nome,
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
