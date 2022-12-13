import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sessoes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().primary().unique()
      table.integer('estado').notNullable()
      table.timestamp('horario').notNullable()
      table.double('preco').unsigned().notNullable()
      table.integer('id_sala').unsigned().references('id').inTable('salas').notNullable()
      table.integer('id_filme').unsigned().references('id').inTable('filmes').notNullable()

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
