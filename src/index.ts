import express, { Request, Response, NextFunction } from 'express'
import { createClient } from 'redis';
import type { Location } from 'types';
import bp from 'body-parser'
import  {createLocation}  from 'db'

const redisClient = createClient();
(async () => {
  try{
   redisClient.on('error', (err) => console.log('Redis Client Error', err));
   await redisClient.connect();
   await redisClient.set('key', 'value');
  const value = await redisClient.get('key');
  console.log('redis value',value)
  }catch(error){
    console.log('error redis', error)
  }
})();
const expTime = 14400


//import db from 'db'

const PORT = process.env.PORT || 3001

const app = express()
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.post('/add-location', async (req: Request, res: Response, next: NextFunction) => {
  const  {name, latitude, longitude}  = req.body
  try {
      const redisData = await redisClient.get(name)
      console.log(redisData)
      if(redisData === null) await redisClient.setEx(name, expTime, JSON.stringify({name, latitude, longitude}))
      await createLocation({name, latitude, longitude})
  }catch(error){
    console.log('error add location',error)
    return next(error);
    
  }
  
  res.sendStatus(200)
})

app.get('/', (req: Request, res: Response) => {
  
  res.send('hello')
})

app.listen(PORT, () => {
  console.log(`app runnin on port ${PORT}`)
 // db.runMigrations()
})