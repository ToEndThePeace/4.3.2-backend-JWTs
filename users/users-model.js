const db = require("../database/connection");

module.exports = {
  find,
  findBy,
  findById,
  add,
  getDepts,
};

function find(dept = null) {
  console.log(dept);
  return dept
    ? db("users AS U")
        .join("departments AS D", "D.id", "U.dept_id")
        .select("U.id", "U.username", "D.name AS department")
        .where("D.name", dept)
        .orderBy("U.id")
    : db("users").select("id", "username").orderBy("id");
}
function findBy(filter) {
  return db("users AS U")
    .join("departments AS D", "U.dept_id", "D.id")
    .select("U.id", "U.username", "U.password", "D.name AS department")
    .where(filter)
    .orderBy("U.id");
}
function findById(id) {
  return db("users AS U")
    .join("departments AS D", "D.id", "U.dept_id")
    .select("U.id", "U.username", "D.name AS department")
    .where("U.id", id)
    .first();
}
async function add(newUser) {
  try {
    const [id] = await db("users").insert(newUser, "id");
    return findById(id);
  } catch (e) {
    throw e;
  }
}
function getDepts() {
  return db("departments").orderBy("id");
}
