/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('publicacoes', function(table){
      table.increments().primary();
      table.string('atividade').notNullable();
      table.string('descricao').notNullable();
      table.string('area').notNullable();
      table.string('data').notNullable();
      table.string('projeto').notNullable();
      table.string('local').notNullable();

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('publicacoes')
};
