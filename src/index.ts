import express, { Request, Response, NextFunction } from 'express'
import redis from 'redis'

//const redis = require('redis');
//const redisClient = redis.createClient("redis://redis_db:6379");


(async () => {
  try{
  const redisClient = redis.createClient({
    url: 'redis://redis_db:6379'
  });

  redisClient.on('error', (err) => console.log('Redis Client Error', err));
  

  await redisClient.connect();

  await redisClient.set('key', 'value');
  const value = await redisClient.get('key');
  }catch(error){
    console.log('error')
  }
})();


//import db from 'db'

const PORT = process.env.PORT || 3001

const app = express()

app.post('/add-location', (req: Request, res: Response) => {
  res.send('hello')
    
  })

app.get('/', (req: Request, res: Response) => {
  res.send('hello')
})

app.listen(PORT, () => {
  console.log(`app runnin on port ${PORT}`)
  
  
  //db.runMigrations()
})