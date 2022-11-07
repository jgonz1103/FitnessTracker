const { Pool } = require('pg');
const{ query } = require('express');

const connectionString = process.env.DATABASE_URL || 'https://localhost:5432/fitness-dev';

const client = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

module.exports = client;
