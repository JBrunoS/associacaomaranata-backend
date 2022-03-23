/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('posts', function(table){
        table.increments().primary();
        table.string('atividade').notNullable()
        table.string('descricao').notNullable()
        table.string('area').notNullable()
        table.string('data').notNullable()
        table.string('projeto').notNullable()
        table.string('local').notNullable()
        table.string('url').notNullable()
        table.string('nome').notNullable()
        table.string('key').notNullable()
        table.string('user_id').notNullable()

    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('posts')
};
