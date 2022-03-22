/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('messages', function(table){
        table.increments().primary()
        table.string('nome').notNullable()
        table.string('email').notNullable()
        table.string('mensagem').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now());

    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('messages');
};
