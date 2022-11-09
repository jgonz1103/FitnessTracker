/* eslint-disable no-useless-catch */
const { Client } = require("./client");
const client = new Client('postgres://localhost:5432/FitnessTrackerBackend-dev')

// database functions

// user functions
async function createUser({ username, password }) {
  try{
    const { rows: [ user ] } = await client.query(`
    INSERT INTO users(username, password) 
    VALUES ($1, $2)
    ON CONFLICT (username) DO NOTHING 
    RETURNING *;
    `, [ username, password ]);
    const bcrypt = require('bcrypt');
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
    const isValid = await bcrypt.compare(password, hashedPassword)

    return user;
  }
  catch(error){
    throw error;
  }
}

async function getUser({ username, password }) {
  try{
    const user = await getUserByUsername(username);
    const bcrypt = require('bcrypt');
    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(password, hashedPassword)
    return user
  }
  catch(error){
    throw error
  }
}

async function getUserById(userId) {
  const { rows } = await client.query(`
  SELECT * FROM users
  WHERE id=${userId}
  `)
  delete rows[0].password
  if(rows==undefined){return null}
  // const userPosts = await getAllRoutinesByUser(userId)
  // rows[0].posts = JSON.stringify(userPosts)
  return rows
}

async function getUserByUsername(userName) {
  try{
  const { rows } = await client.query(`
    SELECT username FROM users
  `, [userName])
  return rows[userName]
  }
  catch(error){
    throw error
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
