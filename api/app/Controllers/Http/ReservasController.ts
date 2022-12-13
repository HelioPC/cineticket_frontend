import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Reserva from 'App/Models/Reserva'
import { dateToStr } from 'App/helpers/date'
import Database from '@ioc:Adonis/Lucid/Database'
import Cliente from 'App/Models/Cliente'
import ReservasLugare from 'App/Models/ReservasLugare'

export default class ReservasController {
  public async create ({ request, response }: HttpContextContract) {
    const { cliente } = request.only([ 'cliente' ])
    const data = dateToStr(new Date())

    try {
      const novaReserva = await Reserva.create({
        data,
        id_cliente: cliente,
        estado: 0,
      })

      response.status(201)
      return {
        status: 'sucesso',
        data: novaReserva,
        message: 'sucesso ao criar reserva',
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'falha ao criar reserva',
      }
    }
  }

  public async make ({ request, response }: HttpContextContract) {
    const { nome, telefone, places } = request.only([ 'nome', 'telefone', 'places' ])

    // Validar se os parâmetros existem (front-back)
    if(nome === undefined || telefone === undefined || places === undefined) {
      response.status(500)
      return {
        status: 'erro',
        message: 'Os parâmetros estão errados',
      }
    }

    const trx = await Database.transaction()

    try {
      // Add all "make reservation" logic here

      // 1º Create the client
      let lastClient = await Cliente.findBy('nome', nome, trx)

      if(lastClient === null) {
        lastClient = await Cliente.create({
          nome: nome,
          telefone: telefone,
        }, trx)
      }

      console.log('cliente criado')

      console.log(lastClient)

      // Create a Reserva
      const data = dateToStr(new Date())
      console.log(data)
      const lastReserva = await Reserva.create({
        data,
        id_cliente: lastClient.id,
        estado: 0,
      }, trx)
      console.log(lastReserva)

      // Occupy the reserve seats
      const lugares = places.split(',')
      console.log(lugares)

      for (let i = 0; i < lugares.length; i++) {
        await ReservasLugare.create({
          id_reserva: lastReserva.id,
          id_lugar_disponivel: lugares[i],
        }, trx)
        console.log('Reservou o lugar')
        // UPDATE lugares_disponiveis SET estado = 1 WHERE id_disponivel = (?)
        await trx.from('lugares_disponiveis').update({ estado: 1 }).where('id', lugares[i])
        console.log('Ocupou o lugar')
      }

      await trx.commit()
      response.status(201)

      return {
        status: 'sucesso',
        data: lastClient,
        message: 'sucesso ao efetuar a reserva',
      }
    } catch (error) {
      await trx.rollback()
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'falha ao efetuar a reserva',
      }
    }
  }

  public async show ({ response }: HttpContextContract) {
    /**
     * ID_RESERVA: string;
    ID_CINEMA: string;
    CLIENTE: string;
    FILME: string;
    DATA: string;
    LUGARES: string;
    CINEMA: string;
    SALA: string;
    ESTADO: string;
     */
    try {
      const reservas = await Database.rawQuery(
        'SELECT DISTINCT R.ID AS ID_RESERVA, C.NOME AS CLIENTE, '+
        'F.titulo as FILME, F.ID, DATE(S.HORARIO) AS "DATA", '+
        'COUNT(RL.ID_RESERVA) as LUGARES, '+
        'CI.nome as CINEMA, SA.NUMERO AS SALA, R.ESTADO FROM RESERVAS R '+
        'INNER JOIN CLIENTES C ON (C.ID = R.ID_CLIENTE) '+
        'INNER JOIN RESERVAS_LUGARES RL ON (RL.ID_RESERVA = R.ID) '+
        'INNER JOIN LUGARES_DISPONIVEIS LD ON (LD.ID = RL.ID_LUGAR_DISPONIVEL) '+
        'INNER JOIN SESSOES S ON (S.ID = LD.ID_SESSAO) '+
        'INNER JOIN FILMES F ON(F.ID = S.ID_FILME) '+
        'INNER JOIN SALAS SA ON (SA.ID = S.ID_SALA) '+
        'INNER JOIN CINEMAS CI ON (CI.ID = SA.ID_CINEMA) '+
        'GROUP BY R.ID,S.HORARIO,CI.nome,SA.NUMERO,C.NOME,F.titulo,F.ID,R.ESTADO '+
        'ORDER BY R.ID DESC'
      )

      if(reservas) {
        response.status(200)
        return {
          status: 'sucesso',
          data: reservas[0],
          message: 'sucesso ao listar reservas',
        }
      } else {
        response.status(204)
        return {
          status: 'sucesso',
          data: [],
          message: 'sem reservas',
        }
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'erro ao listar as reservas',
      }
    }
  }

  public async showById ({ response, params }: HttpContextContract) {
    try {
      const reserva = await Reserva.find(params.id)

      if(reserva !== null) {
        response.status(200)
        return {
          status: 'sucesso',
          data: reserva,
          message: 'sucesso ao encontrar o reserva',
        }
      } else {
        response.status(206)
        return {
          status: 'sucesso',
          data: [],
          message: 'sem reserva',
        }
      }
    } catch (error) {
      response.status(500)
      return {
        status: 'erro',
        data: error,
        message: 'erro ao encontrar o reserva',
      }
    }
  }
}
