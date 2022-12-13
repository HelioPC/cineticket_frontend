import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cinema from 'App/Models/Cinema'
import Funcionario from 'App/Models/Funcionario'

export default class FuncionariosController {
  public async create ({ request, response }: HttpContextContract) {
    const { nome, email, senha, nivel, cinema } = request.only([ 'nome', 'email', 'senha', 'nivel', 'cinema' ])

    try {
      const novoFuncionario = await Funcionario.create({
        nome,
        email,
        senha,
        nivel,
        id_cinema: cinema,
      })

      response.status(201)
      return {
        status: 'sucesso',
        data: novoFuncionario,
        message: 'sucesso ao criar funcionário',
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'falha ao criar funcionário',
      }
    }
  }

  public async login ({ request, response }: HttpContextContract) {
    const { email, senha } = request.only([ 'email', 'senha' ])

    try {
      const funcionario = await Funcionario.findBy('email', email)

      if(funcionario === null) {
        response.status(200)
        return {
          status: 'erro',
          data: null,
          message: 'funcionário não encontrado',
        }
      } else if(funcionario.senha !== senha) {
        response.status(200)
        return {
          status: 'erro',
          data: null,
          message: 'senha do funcionário está incorreta',
        }
      } else {
        response.status(200)
        return {
          status: 'sucesso',
          data: {
            ID_FUNCIONARIO: funcionario.id,
            ID_CINEMA: funcionario.id_cinema,
            NOME: funcionario.nome,
            EMAIL: funcionario.email,
            NIVEL: funcionario.nivel,
            SENHA: funcionario.senha,
          },
          message: 'Credencias do funcionário estão corretas',
        }
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'falha ao criar funcionário',
      }
    }
  }

  public async show ({ response }: HttpContextContract) {
    try {
      const funcionarios = await Funcionario.all()

      if(funcionarios) {
        response.status(200)
        return {
          status: 'sucesso',
          data: await Promise.all(funcionarios.map(async (funcionario) => {
            let cinema = await Cinema.find(funcionario.id)

            return {
              ID_FUNCIONARIO: funcionario.id,
              ID_CINEMA: funcionario.id_cinema,
              NOME: funcionario.nome,
              EMAIL: funcionario.email,
              NIVEL: funcionario.nivel,
              SENHA: funcionario.senha,
              CINEMA: cinema?.nome,
            }
          })),
          message: 'sucesso ao listar funcionarios',
        }
      } else {
        response.status(204)
        return {
          status: 'sucesso',
          data: [],
          message: 'sem funcionarios',
        }
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'erro ao listar as funcionarios',
      }
    }
  }

  public async showById ({ response, params }: HttpContextContract) {
    try {
      const funcionario = await Funcionario.find(params.id)

      if(funcionario) {
        const cinema = await Cinema.find(funcionario.id)
        response.status(200)
        return {
          status: 'sucesso',
          data: {
            ID_FUNCIONARIO: funcionario.id,
            ID_CINEMA: funcionario.id_cinema,
            NOME: funcionario.nome,
            EMAIL: funcionario.email,
            NIVEL: funcionario.nivel,
            SENHA: funcionario.senha,
            CINEMA: cinema?.nome,
          },
          message: 'sucesso ao encontrar o funcionario',
        }
      } else {
        response.status(204)
        return {
          status: 'sucesso',
          data: [],
          message: 'sem funcionario',
        }
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'erro ao encontrar o funcionario',
      }
    }
  }
}
