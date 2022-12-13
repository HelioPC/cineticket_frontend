import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import ReservasLugare from './ReservasLugare'

export default class Reserva extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => ReservasLugare)
  public reservas: HasMany<typeof ReservasLugare>

  @column()
  public id_cliente: number

  @column()
  public data: string

  @column()
  public estado: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
