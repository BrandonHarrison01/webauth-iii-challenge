
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();

        tbl.string('username', 15).unique().notNullable()
        tbl.string('password', 15).notNullable()
        tbl.string('department', 20)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
};
