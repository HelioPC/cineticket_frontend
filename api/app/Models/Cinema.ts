import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Sala from './Sala'
import Funcionario from './Funcionario'

export default class Cinema extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Sala)
  public salas: HasMany<typeof Sala>

  @hasMany(() => Funcionario)
  public funcionarios: HasMany<typeof Funcionario>

  @column()
  public nome: string

  @column()
  public id_rua: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
