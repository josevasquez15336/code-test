import express, { NextFunction, Request, Response } from 'express';
const router = express.Router();
const redis = require('redis')
const client = redis.createClient()
const geo = require('georedis').initialize(client)
import { createLocation } from '../db/index'


router.post('/', async (req: Request, res: Response, next: NextFunction) => {

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

module.exports = router