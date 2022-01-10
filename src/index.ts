import express, { Request, Response, NextFunction } from 'express';
import bp from 'body-parser';

const PORT = process.env.PORT || 3001

const app = express()

const getDistanceRoute = require('./routes/getDistance')

const addLocation = require('./routes/addLocation')

app.use(bp.urlencoded({ extended: true }))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use('/distance', getDistanceRoute)

app.use(bp.json())

app.use('/add-location', addLocation)

app.listen(PORT, () => {
  console.log(`app runnin on port ${PORT}`)
})