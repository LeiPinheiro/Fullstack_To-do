import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    taskName:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('Tasks', taskSchema)