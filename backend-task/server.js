import dotenv from 'dotenv'
import app from './app.js'
import dbConnection from './Config/dbConnection.js'

dotenv.config()

const port = process.env.PORT || 5000
const  serverConnection = async()=>{
    await dbConnection()
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`)
    })
}
serverConnection()  