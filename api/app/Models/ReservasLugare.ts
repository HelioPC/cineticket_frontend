import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ReservasLugare extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_lugar_disponivel: number

  @column()
  public id_reserva: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
