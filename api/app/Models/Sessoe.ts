import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import Database from '@ioc:Adonis/Lucid/Database'

export default class Sessoe extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_sala: number

  @column()
  public id_filme: number

  @column()
  public estado: number

  @column()
  public preco: number

  @column.dateTime()
  public horario: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static async exists ({ data, duracao, sala }) {
    try {
      const sessoes = await Database.rawQuery(
        'SELECT DISTINCT SS.ID AS ID, C.nome AS CINEMA,F.titulo,SS.HORARIO as INICIO, '+
        'DATE_ADD(SS.HORARIO,INTERVAL F.duracao MINUTE) as FIM FROM SESSOES SS '+
        'INNER JOIN FILMES F ON (SS.id_filme = F.id) '+
        'INNER JOIN SALAS S ON (S.ID = SS.ID_SALA) '+
        'INNER JOIN CINEMAS C ON(C.ID = S.ID_CINEMA) '+
        'INNER JOIN LUGARES_DISPONIVEIS LD ON (LD.ID_SESSAO = SS.ID) '+
        'WHERE ( (?) between SS.HORARIO AND (DATE_ADD(SS.HORARIO,INTERVAL F.duracao MINUTE)) OR '+
        '(SS.HORARIO between (?) AND (DATE_ADD( (?) ,INTERVAL (?) MINUTE)))) '+
        'AND SS.ID_SALA = (?) ORDER BY SS.ID DESC',
        [data, data, data, duracao, sala]
      )

      return sessoes.length > 0
    } catch (error) {
      throw Error('Ocorreu um erro inesperado')
    }
  }
}
