import express, { Request, Response, NextFunction } from 'express';

import bp from 'body-parser';
import  {createLocation}  from 'db';

const redis = require('redis'),
    client = redis.createClient()
const geo = require('georedis').initialize(client)
const PORT = process.env.PORT || 3001

const app = express()

app.use(bp.urlencoded({ extended: true }))
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/distance', (req: Request, res: Response) => {
  console.log('query', req.query)
 const { placeOne, placeTwo, unit } = req.query
 console.log('paceOne',placeOne)
  res.send('hello')
})

app.use(bp.json())

app.post('/add-location', async (req: Request, res: Response, next: NextFunction) => {
  const  {name, latitude, longitude}  = req.body

    geo.location(name, (err:Error, location: Record<string, number>)=>{
      if(err){ 
        console.error(err);
        return next(err);
      }
      else if ( location === null ) {
        geo.addLocation(name, { latitude, longitude }, (err: Error, reply: Record<string, number>) =>{
          if(err) { 
            console.error(err)
            return next(err);
          }
          else console.log('added locations:', reply)
        })
      }
    })
    try{
    await createLocation({name, latitude, longitude})
    }catch(error){
      console.error(error)
      return next(error);
    }
    res.sendStatus(200)
})


app.listen(PORT, () => {
  console.log(`app runnin on port ${PORT}`)

})