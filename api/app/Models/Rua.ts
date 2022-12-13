import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Cinema from './Cinema'

export default class Rua extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => Cinema)
  public cinemas: HasOne<typeof Cinema>

  @column()
  public id_cidade: number

  @column()
  public nome: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
