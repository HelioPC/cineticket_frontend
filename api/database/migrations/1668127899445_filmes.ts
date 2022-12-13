import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'filmes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().primary().unique()
      table.string('titulo').notNullable().unique()
      table.string('genero').notNullable()
      table.string('classificacao').notNullable()
      table.string('descricao', 255).notNullable()
      table.string('capa_url').notNullable()
      table.integer('ano').unsigned().notNullable()
      table.integer('duracao').unsigned()

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
