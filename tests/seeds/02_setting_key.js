exports.seed = function (knex, Promise) {
  return knex("setting_key").del()
    .then(function () {
      return knex("setting_key").insert([
        { "app_id": "4732e056-d911-48d5-8ed3-a46294acc6b4", "name": "face_auth_required", "description": "face auth setting", "validation_rule": { "type": "boolean" }}
      ]);
    });
};
