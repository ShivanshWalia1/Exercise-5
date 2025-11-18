import express from 'express'
import dataRouter from './routes/user.js'
const port = 3000
const app = express()

app.use(express.json())
app.use('/user', dataRouter)

app.listen(port, ()=>{
    console.log('Listening on port 3000')
})

export default app