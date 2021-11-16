import { useState } from 'react'

function ToDoForm({ addTask,addTask2  }) {
    const [userInput, setUserInput] = useState('')
    const [userInput2, setUserInput2] = useState('')

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }
    const handleChange2 = (e) => {
        setUserInput2(e.currentTarget.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        addTask(userInput)
        addTask2(userInput2)
        setUserInput("")
    }

    const handleKeyPress = (e) => {
        if(e.key === "Enter") {
            handleSubmit(e)
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                value={userInput}
                type="text"
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="Введите значение..."
            />   
             <input 
                value={userInput2}
                type="text"
                onChange={handleChange2}
                onKeyDown={handleKeyPress}
                placeholder="Введите значение..."
            />        
            <button>Сохранить</button>
        </form>
    )
}

export default ToDoForm