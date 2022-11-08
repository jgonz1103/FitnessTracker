const Client = require('pg')
const {query} = require('express');
const client = require('./client');


async function createUsers({ username, password, name}) {
  try {
    const {
      rows: [user],
    } =await client.query(
      `INSERT INTO users(username, password, name) 
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
      `,
          [username, password, name, location]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"$${index + 1}`)
    .join(", ");

if (setString.length === 0) return;

try {
  const {
    rows: [user],
  } = await client.query(
    ` UPDATE users
    SET ${setString}
    WHERE id=${id}
    RETURNING *; 
    `,
    Object.values(fields)
  );

  return user;
} catch (error) {
  throw error;
}
}

async function getALLUsers() {
  const { rows } = await client.query(
    `SELECT id, username, name, location, active
    FROM users;
    `
  );
  return rows;
}

async function createActivity()


module.exports = {
  // ...require('./client'), // adds key/values from users.js
  ...require('./users'), // adds key/values from users.js
  ...require('./activities'), // adds key/values from activites.js
  ...require('./routines'), // etc
  ...require('./routine_activities') // etc
}