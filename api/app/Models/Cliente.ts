import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Reserva from './Reserva'

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Reserva)
  public reservas: HasMany<typeof Reserva>

  @column()
  public nome: string

  @column()
  public telefone: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
