const fs = require("fs");
const path = require("path")
const dotenv = require("dotenv");

dotenv.config();


const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, APP_HOST } = process.env
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "../key/private.key"));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "../key/public.key"));

module.exports = {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  PRIVATE_KEY,
  PUBLIC_KEY,
  APP_HOST
}