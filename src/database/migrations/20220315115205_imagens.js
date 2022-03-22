/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('imagens', function(table){
    table.increments().primary();
    table.string('nome').notNullable();
    table.string('key').notNullable();
    table.integer('size').notNullable();
    table.string('url');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('user_id').notNullable();
    
    table.foreign('user_id').references('id').inTable('publicacoes');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('imagens')
};
