exports.up = function (knex) {
  return knex.schema
    .createTable("departments", (t) => {
      t.increments();
      t.string("name", 256).notNullable().unique();
    })
    .createTable("users", (t) => {
      t.increments();
      t.string("username", 256).notNullable().unique().index();
      t.string("password", 256).notNullable();
      t.integer("dept_id")
        .notNullable()
        .unsigned()
        .references("departments.id")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("departments");
};
