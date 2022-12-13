import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Rua from './Rua'

export default class Cidade extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Rua)
  public ruas: HasMany<typeof Rua>

  @column()
  public nome: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
