import React from 'react'
import { useState } from 'react';
import './App.css';
import ToDo from './ToDo'

function App() {

const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || [])
const [userInput, setUserInput] = useState('')
const [userInput2, setUserInput2] = useState('')
const [area1, setArea1] = useState('')
const [area2, setArea2] = useState('')

  const addTask = (userInput, userInput2) => {
    if(userInput) {
      const newItem = {
        id: Math.random().toString(36),
        currentWord: userInput,
        translatedWord: userInput2,
        complete: false
      }
      let array = [...todos, newItem]
      localStorage.setItem('todos', JSON.stringify(array))
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


function translate() {
  let arr = area1.split(' ')
  if(arr.length > 0 ) {
    for(let i=0; i<arr.length;i++) {
      for(let j=0; j<todos.length;j++) {
        let temporalWord = arr[i]

        if(temporalWord.substring(temporalWord.length-3, temporalWord.length) === "...") {
          let temp = temporalWord.substring(0, temporalWord.length-3)

          if(todos[j].currentWord.toLowerCase() === temp.toLowerCase()) {
            arr[i] =todos[j].translatedWord.toLowerCase()+"..."
          }
          continue
        }

        if(temporalWord[temporalWord.length -1] === ".") {
          let temp = temporalWord.substring(0, temporalWord.length-1)
          if(todos[j].currentWord.toLowerCase() === temp.toLowerCase()) {
            arr[i] =todos[j].translatedWord.toLowerCase()+"."
          }
          continue
        }

        if(temporalWord[temporalWord.length -1] === ",") {
          let temp = temporalWord.substring(0, temporalWord.length-1)

          if(todos[j].currentWord.toLowerCase() === temp.toLowerCase()) {
            arr[i] =todos[j].translatedWord.toLowerCase()+","
          }
          continue
        }

        if(temporalWord[temporalWord.length -1] === "?") {
          let temp = temporalWord.substring(0, temporalWord.length-1)
          
          if(todos[j].currentWord.toLowerCase() === temp.toLowerCase()) {
            arr[i] =todos[j].translatedWord.toLowerCase()+"?"
          }
          continue
        }

        if(temporalWord[temporalWord.length -1] === "!") {
          let temp = temporalWord.substring(0, temporalWord.length-1)
          
          if(todos[j].currentWord.toLowerCase() === temp.toLowerCase()) {
            arr[i] =todos[j].translatedWord.toLowerCase()+"!"
          }
          continue
        }

        if(todos[j].currentWord.toLowerCase() === arr[i].toLowerCase()) {
          arr[i] =todos[j].translatedWord.toLowerCase()
        }
      }
    }
    setArea2(arr.join(' '))
  }
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
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="Введите слово..."
            />   
             <input 
                value={userInput2}
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
