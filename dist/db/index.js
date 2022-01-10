"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
//import { migrate } from 'postgres-migrations'
var poolConfig = {
    database: process.env.DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    max: Number(process.env.DB_POOL_SIZE),
    idleTimeoutMillis: Number(process.env.DB_POOL_CLIENT_IDLE_TIMEOUT),
    connectionTimeoutMillis: Number(process.env.DB_POOL_CLIENT_CONNECTION_TIMEOUT),
};
var Database = /** @class */ (function () {
    function Database() {
        this.pool = new pg_1.Pool(poolConfig);
    }
    return Database;
}());
var db = new Database();
exports.default = db;
