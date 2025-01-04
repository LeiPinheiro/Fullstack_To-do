
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

function App() {

  const [tasks, setTasks] = useState([])
  const [taskName, setTaskName] = useState('')

  // Getting tasks
  useEffect(() => {
    api.get('/tasks').then((response) => {
      setTasks(response.data)
    })
    .catch((error) => {
      console.error('Erro ao buscar tasks', error)
    })
  }, [])

  // Sending post request
  function newTask() {
    api.post('addtask', {
      taskName
    }).then((response) => {
      window.location.reload()
    })
  }

  // Deleting tasks
  function deleteTask(id){
    try{
      api.delete(`deltask/${id}`)
      window.location.reload()
    }catch(error){
      console.log('Não foi possível apagar a task', error)
    }
  }

  // Toggle check
  function toggleCheck(id){
    const updatedTasks = tasks.map((task) =>{
      if (task._id === id){
        return {...task, checked: !task.checked}
      }
      return task
    })
    setTasks(updatedTasks)
  }


  return (
    <>
    <div className="todoContainer">
      <h1>Daily Todo's</h1>
      <div className="inputContainer">
        <input type="text" placeholder='Adicione uma task' onChange={event => setTaskName(event.target.value)}/>
        <button onClick={newTask}>Enviar</button>
      </div>
        {tasks.map(task => (
          <div key={task._id} className='tasksContainer'>
            <p className={task.checked ? "checked" : "unchecked"}>{task.taskName}</p>
            <div className='buttonsDiv'>
              <button onClick={() => toggleCheck(task._id)} className='checkBtn'>{task.checked ? 'Undone' : 'Done'}</button>
              <button onClick={() => deleteTask(task._id)} className='delBtn'>Deletar</button>
            </div>
          </div>
        ))}
    </div>
    </>
  )
}

export default App
