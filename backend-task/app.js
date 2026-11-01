import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { catchError } from 'vanta-api'
import exportValidation from './Middlewares/exportValidation.js'
import authRouter from './Modules/Auth/auth.js'
import taskRouter from './Modules/Task/task.js'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(exportValidation)

app.use('/api/auth', authRouter)
app.use('/api/task', taskRouter)

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Task Tracker API is running...',
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});


app.use(catchError)
export default app
