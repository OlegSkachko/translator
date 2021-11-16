
import { useState } from 'react';
import './App.css';
import ToDo from './ToDo'
import ToDoForm from './ToDoForm'

function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || [])
  const [Task2, setTask2] = useState([])
  
const [userInput, setUserInput] = useState('')
const [userInput2, setUserInput2] = useState('')

  const addTask = (userInput, userInput2) => {
    if(userInput) {
      const newItem = {
        id: Math.random().toString(36).substr(2,9),
        task: userInput,
        task1: userInput2,
        complete: false
      }
      let array = [...todos, newItem]
      localStorage.setItem('todos', JSON.stringify(array) )
      setTodos(array)
    }
  }
  
  


  const removeTask = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)])
  }

  const handleToggle = (id) => {
    setTodos([
      ...todos.map((todo) => 
        todo.id === id ? { ...todo, complete: !todo.complete } : {...todo }
      )
    ])
  }




const [area1, setArea1] = useState('')
const [area2, setArea2] = useState('')

const [inp1, setInp1] = useState('')
const [inp2, setInp2] = useState('')

const [translated, setTranslated] = useState([])
const [words, setWords] = useState([ {
  name: 'hi',
  value: 'привет',
}])



function translate() {
  let arr = area1.split(' ')

  for(let i=0; i<arr.length;i++) {
    for(let j=0; j<todos.length;j++) {
      if(todos[j].task === arr[i]) {
        arr[i] =todos[j].task1
      }
    }
  }
  setArea2(arr.join(' '))
}
function add() {

}




    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }
    const handleChange2 = (e) => {
        setUserInput2(e.currentTarget.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        addTask(userInput,userInput2)
        setUserInput("")
        setUserInput2("")
    }

    const handleKeyPress = (e) => {
        if(e.key === "Enter") {
            handleSubmit(e)
        }
    }



  return (
    <div className="App">
      Исходный текст<br/>
      <textarea className='text' onChange={(e)=>setArea1(e.target.value)}></textarea>
      <button onClick={translate}>перевести</button>
       Переведенный текст <br/>
      <textarea className='text' placeholder={area2}></textarea>
  
      <header>
        <h1>Список cлов: {todos.length}</h1>
      </header>
      <form onSubmit={handleSubmit}>
            <input 
                value={userInput}
                type="text"
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="Введите слово..."
            />   
             <input 
                value={userInput2}
                type="text"
                onChange={handleChange2}
                onKeyDown={handleKeyPress}
                placeholder="Введите перевод..."
            />        
            <button>Сохранить</button>
        </form>
      {todos.map((todo) => {
        return (
          <ToDo
            todo={todo}
            key={todo.id}
            toggleTask={handleToggle}
            removeTask={removeTask}
            />
        )
      })}
    </div>
  );
}

export default App;
