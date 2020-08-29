exports.up = async function (knex) {
  return await knex.schema.createTable("todo", (t) => {
    t.increments("id").unsigned().primary().comment("Primary key");
    t.text("todo").notNullable().comment("Todo task detail");
    t.integer("status").comment("Todo status");
    t.boolean("is_deleted")
      .defaultTo(false)
      .comment("Tells if the row has been deleted");
    t.timestamp("created_at")
      .defaultTo(knex.fn.now())
      .comment("The timestamp at which the row was created");
    t.timestamp("updated_at")
      .defaultTo(knex.fn.now())
      .comment("The timestamp at which the row was updated");
    t.integer("created_by").comment("The id of user who created the record");
    t.integer("updated_by").comment("The id of user who updated the record");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("todo");
};
