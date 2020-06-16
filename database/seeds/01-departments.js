exports.seed = function (knex) {
  return knex("departments").insert([
    { name: "Sales" },
    { name: "Accounting" },
    { name: "Customer Service" },
  ]);
};
