import Knex from "knex";
// @ts-ignore
const knex: Knex = Knex({
  client: "pg",
  connection: {
    host: process.env.PGHOST,
    port: process.env.PGPORT! as unknown as number,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: null,
  },
  pool: { min: 0, max: 7 }
});

export {
  knex,
  Knex
};
