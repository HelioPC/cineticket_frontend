import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Filme from 'App/Models/Filme'
import Sala from 'App/Models/Sala'
import Sessoe from 'App/Models/Sessoe'

export default class SessoesController {
  public async create ({ request, response }: HttpContextContract) {
    const { horario, price, sala, filme } = request.only([ 'horario', 'price', 'sala', 'filme' ])

    try {
      if(parseInt(price) < 3000 || parseInt(price) > 20000) {
        response.status(406)
        return {
          status: 'erro',
          message: 'Preço da sessão inaceitável',
        }
      }

      const findSala = await Sala.find(sala)

      if(findSala === null) {
        response.status(404)
        return {
          status: 'erro',
          message: 'Sala não foi encontrada',
        }
      }

      const findFilme = await Filme.find(filme)

      if(findFilme === null) {
        response.status(404)
        return {
          status: 'erro',
          message: 'Filme não foi encontrado',
        }
      }

      const validate = await Sessoe.exists({data: horario, duracao: findFilme.duracao, sala: findSala.id})

      if(validate) {
        response.status(403)
        return {
          status: 'erro',
          message: 'Uma sessão estará a decorrer neste periodo',
        }
      }

      const novaSessao = await Sessoe.create({
        estado: 1,
        horario,
        preco: price,
        id_sala: sala,
        id_filme: filme,
      })

      response.status(201)
      return {
        status: 'sucesso',
        data: novaSessao,
        message: 'Sucesso ao criar sessão',
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'Falha ao criar sessão',
      }
    }
  }

  public async show ({ response }: HttpContextContract) {
    try {
      const sessoes = await Database.rawQuery(
        // eslint-disable-next-line max-len
        'SELECT SS.ID AS ID, C.nome AS CINEMA, C.ID AS ID_CINEMA, F.TITULO, SS.HORARIO as DATA, SS.PRECO, S.numero AS SALA ,(COUNT(LD.ID)-(SELECT COUNT(ID) FROM LUGARES_DISPONIVEIS WHERE ID_SESSAO=SS.ID AND ESTADO=1) ) AS \'DISPONIVEIS\' FROM SESSOES SS INNER JOIN FILMES F ON (SS.id_filme = F.id) INNER JOIN SALAS S ON (S.ID = SS.ID_SALA) INNER JOIN CINEMAS C ON(C.ID = S.ID_CINEMA) INNER JOIN LUGARES_DISPONIVEIS LD ON (LD.ID_SESSAO = SS.ID) GROUP BY C.NOME,C.ID,SS.ID,S.NUMERO,F.ID,F.TITULO,SS.PRECO,SS.HORARIO ORDER BY SS.ID DESC'
      )

      if(sessoes) {
        response.status(200)
        return {
          status: 'sucesso',
          data: sessoes[0],
          message: 'sucesso ao listar sessões',
        }
      } else {
        response.status(204)
        return {
          status: 'sucesso',
          data: [],
          message: 'sem sessões',
        }
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'erro ao listar as sessões',
      }
    }
  }

  public async showById ({ response, params }: HttpContextContract) {
    try {
      const sessao = await Sessoe.find(params.id)

      if(sessao !== null) {
        response.status(200)
        return {
          status: 'sucesso',
          data: sessao,
          message: 'sucesso ao encontrar o sessão',
        }
      } else {
        response.status(206)
        return {
          status: 'sucesso',
          data: [],
          message: 'sem sessão',
        }
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'erro ao encontrar o sessão',
      }
    }
  }

  // SELECT LD.id_disponivel,LD.estado,L.numero FROM LUGARES_DISPONIVEIS LD
  //INNER JOIN lugares L ON (LD.id_lugar = L.id_lugar)
  //WHERE LD.ID_SESSAO = :id_sessao
  public async lugares ({ response, params }: HttpContextContract) {
    try {
      const sessao = await Sessoe.find(params.id)

      if(sessao !== null) {
        const lugares = await Database.rawQuery(
          'SELECT LD.id as ID_DISPONIVEL,LD.ESTADO,L.id as ID_LUGAR,LD.ID_SESSAO FROM LUGARES_DISPONIVEIS LD '+
          'INNER JOIN lugares L ON (LD.id_lugar = L.id) '+
          'WHERE LD.ID_SESSAO = (?)',
          [sessao.id]
        )

        response.status(200)
        return {
          status: 'sucesso',
          data: lugares[0],
          message: 'encontrados',
        }
      } else {
        response.status(206)
        return {
          status: 'erro',
          data: [],
          message: 'A sessão não existe',
        }
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'erro ao encontrar o sessão',
      }
    }
  }
}
