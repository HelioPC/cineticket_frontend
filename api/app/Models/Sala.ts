import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Sessoe from './Sessoe'

export default class Sala extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Sessoe)
  public sessoes: HasMany<typeof Sessoe>

  @column()
  public id_cinema: number

  @column()
  public numero: string

  @column()
  public capacidade: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
