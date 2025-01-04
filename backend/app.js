import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import Tasks from './models/TaskSchema.js'

const app = express()
const port = 3000
app.use(express.json())
app.use(cors())


// Getting all tasks
app.get('/tasks', async (req, res) => {
    try{
        const tasks = await Tasks.find()
        return res.status(200).json(tasks)
    }catch(error){
        return res.status(500).json({error: 'Erro ao buscar tarefa'})
    }
})

// Add tasks to database
app.post('/addtask', async (req, res) => {
    try{
        const {taskName} = req.body
        const newTask = await Tasks.create({taskName})
        return res.status(201).json({message: 'Task criada com sucesso', newTask})
    }catch(error){
        return res.status(400).json({message: 'Não foi possivel criar task', error})
    }
})

// Delete task
app.delete('/deltask/:id', async (req, res) => {
    try{
        const id = req.params.id
        const deletedTask = await Tasks.findByIdAndDelete(id)
        return res.status(200).json({message:'Task deletada com sucesso!'})
    }catch(error){
        return res.status(404).json({message:'Ocorreu um erro ao deletar task', error})
    }
})


// Credentials dotenv
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD


// Connectiong database and server
mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.tmitg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
    app.listen(port, () => {
        console.log(`Banco e servidor rodando. Server port: ${port}`)
    })
}).catch((err) => {
    console.log('Ocorreu um erro', err)
})

