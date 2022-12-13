import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Filme from 'App/Models/Filme'

export default class FilmesController {
  public async create ({ request, response }: HttpContextContract) {
    const { titulo, genero, classificacao, descricao, ano, duracao, capaUrl } = request.only([
      'titulo', 'genero', 'classificacao', 'descricao', 'ano', 'duracao', 'capaUrl',
    ])

    response.status(201)
    console.log(titulo, genero, classificacao, descricao, ano, duracao, capaUrl)

    try {
      const novoFilme = await Filme.create({
        titulo,
        genero,
        classificacao,
        descricao,
        ano,
        duracao,
        capa_url: capaUrl,
      })

      response.status(201)
      return {
        status: 'sucesso',
        data: novoFilme,
        message: 'sucesso ao criar filme',
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'falha ao criar filme',
      }
    }
  }

  public async show ({ response }: HttpContextContract) {
    try {
      const filmes = await Filme.all()

      if(filmes) {
        response.status(200)
        return {
          status: 'sucesso',
          data: filmes.map((filme: Filme) => {
            return {
              id_filme: filme.id,
              ano: filme.ano,
              titulo: filme.titulo,
              duracao: filme.duracao,
              descricao: filme.descricao,
              genero: filme.genero,
              classificacao: filme.classificacao,
              capa_url: filme.capa_url,
            }
          }),
          message: 'sucesso ao listar filmes',
        }
      } else {
        response.status(204)
        return {
          status: 'sucesso',
          data: [],
          message: 'sem filmes',
        }
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'erro ao listar as filmes',
      }
    }
  }

  public async showById ({ response, params }: HttpContextContract) {
    try {
      const filme = await Filme.find(params.id)

      if(filme !== null) {
        response.status(200)
        return {
          status: 'sucesso',
          data: {
            id_filme: filme.id,
            ano: filme.ano,
            titulo: filme.titulo,
            duracao: filme.duracao,
            descricao: filme.descricao,
            genero: filme.genero,
            classificacao: filme.classificacao,
            capa_url: filme.capa_url,
          },
          message: 'sucesso ao encontrar o filme',
        }
      } else {
        response.status(206)
        return {
          status: 'sucesso',
          data: [],
          message: 'sem filme',
        }
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'erro ao encontrar o filme',
      }
    }
  }

  public async exibicao ({ response }: HttpContextContract) {
    try {
      const filmes = await Database.rawQuery(
        'SELECT DISTINCT F.id,F.titulo,F.genero,F.classificacao,F.genero,F.descricao,F.ano,F.capa_url '+
        'FROM SESSOES S INNER JOIN FILMES F ON (S.id_filme = F.id) AND SYSDATE() <=  S.horario '+
        'ORDER BY id DESC'
      )

      if(filmes) {
        response.status(200)
        return {
          status: 'sucesso',
          data: filmes[0],
          message: 'sucesso ao listar filmes',
        }
      } else {
        response.status(204)
        return {
          status: 'sucesso',
          data: filmes,
          message: 'sem filmes',
        }
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'erro ao listar as filmes',
      }
    }
  }

  public async sessions ({ response, params }: HttpContextContract) {
    try {
      const filme = await Filme.find(params.id)

      if(filme !== null) {
        const filmes = await Database.rawQuery(
          'SELECT SS.ID, C.nome AS CINEMA, F.TITULO, SS.HORARIO as DATA, SS.PRECO, S.numero AS SALA, '+
          '(COUNT(LD.ID)-(SELECT COUNT(ID) FROM LUGARES_DISPONIVEIS WHERE '+
          'ID_SESSAO=SS.ID AND ESTADO=1)) AS DISPONIVEIS FROM SESSOES SS '+
          'INNER JOIN FILMES F ON (SS.id_filme = F.id) INNER JOIN SALAS S ON (S.ID = SS.ID_SALA) '+
          'INNER JOIN CINEMAS C ON(C.ID = S.ID_CINEMA) INNER JOIN LUGARES L ON(L.ID_SALA = S.ID) '+
          'INNER JOIN LUGARES_DISPONIVEIS LD ON(LD.ID_LUGAR = L.ID) WHERE SS.ID_FILME = (?) '+
          'AND LD.ID_SESSAO = SS.ID GROUP BY C.NOME, SS.ID, S.NUMERO, F.TITULO, SS.PRECO, SS.HORARIO',
          [filme.id]
        )

        if(filmes) {
          response.status(200)
          return {
            status: 'sucesso',
            data: filmes[0],
            message: 'sucesso ao listar filmes',
          }
        } else {
          response.status(204)
          return {
            status: 'sucesso',
            data: filmes,
            message: 'sem filmes',
          }
        }
      } else {
        response.status(204)
        return {
          status: 'erro',
          message: 'Filme não existe',
        }
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'erro ao listar as filmes',
      }
    }
  }
}
