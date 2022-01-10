"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var redis_1 = __importDefault(require("redis"));
//const redis = require('redis');
var redisClient = redis_1.default.createClient();
redisClient.on('error', function (err) {
    console.log('Error occured while connecting or accessing redis server');
});
//import db from 'db'
var PORT = process.env.PORT || 3001;
var app = (0, express_1.default)();
app.post('/add-location', function (req, res) {
    redisClient.get('geo-location').then(function (value) {
        console.log('redis client result', value);
    });
    res.send('hello');
});
app.get('/', function (req, res) {
    res.send('hello');
});
app.listen(PORT, function () {
    console.log("app runnin on port ".concat(PORT));
    //db.runMigrations()
});
