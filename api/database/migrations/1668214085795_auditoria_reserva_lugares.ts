import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'auditoria_reserva_lugares'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_lugar_disponivel').references('id').inTable('lugares_disponiveis').notNullable().primary()
      table.integer('id_reserva').unsigned().notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
