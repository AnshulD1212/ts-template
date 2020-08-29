exports.seed = function (knex, Promise) {
  return knex("setting_type").del()
    .then(function () {
      return knex("setting_type").insert([
        { "app_id": "4732e056-d911-48d5-8ed3-a46294acc6b4", "name": "proview_token"}
      ]);
    });
};
