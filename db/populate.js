require("dotenv").config();
const { Client } = require("pg");

const sql = `CREATE TABLE IF NOT EXISTS users(
            u_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            email VARCHAR (255) UNIQUE,
            password VARCHAR (255)
            );
             CREATE TABLE IF NOT EXISTS userDet(
               u_id INTEGER PRIMARY KEY,
               firstname VARCHAR (255),
               lastname VARCHAR (255),
               FOREIGN KEY (u_id) REFERENCES users(u_id) ON DELETE CASCADE
             );
             CREATE TABLE posts (
               p_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
               postdetails TEXT,
               created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
             );
             CREATE TABLE user_post(
               u_id INTEGER,
               p_id INTEGER,
               PRIMARY KEY(u_id,p_id),
               FOREIGN KEY (u_id) REFERENCES users(u_id) ON DELETE CASCADE,
               FOREIGN KEY (p_id) REFERENCES posts(p_id) ON DELETE CASCADE
             );
             
            CREATE TABLE member(
              u_id INTEGER PRIMARY KEY,
              member boolean DEFAULT FALSE,
              FOREIGN KEY (u_id) REFERENCES users(u_id) ON DELETE CASCADE
            );
`;

async function main() {
  console.log("sending...");
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  });
  await client.connect();
  await client.query(sql);
  await client.end();
  console.log("done.");
}

main();
