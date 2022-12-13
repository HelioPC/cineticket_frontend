import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Sessoe from './Sessoe'

export default class Filme extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Sessoe)
  public sessoes: HasMany<typeof Sessoe>

  @column()
  public titulo: string

  @column()
  public descricao: string

  @column()
  public genero: string

  @column()
  public classificacao: string

  @column()
  public capa_url: string

  @column()
  public ano: number

  @column()
  public duracao: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
