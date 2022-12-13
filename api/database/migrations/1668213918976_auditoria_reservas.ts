import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'auditoria_reservas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().primary().unique()
      table.date('data_remocao').notNullable()
      table.integer('id_funcionario').unsigned().references('id').inTable('funcionarios').notNullable()
      table.integer('id_cliente').unsigned().references('id').inTable('clientes').notNullable()
      table.integer('id_reserva').unsigned().references('id').inTable('reservas').notNullable()

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
