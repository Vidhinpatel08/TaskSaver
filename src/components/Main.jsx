import React, { useState, useEffect, useContext } from 'react';
import { alertContext } from '../context/Context';
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from 'uuid';
import TodoItem from './TodoItem';


const Main = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const {visibleAlert} = useContext(alertContext)
  const [showFinished, setShowFinished] = useState(false)
  const [todos, setTodos] = useState([])
  const [availableTodo, setAvailableTodo] = useState('')

  useEffect(() => {
    let todoString = localStorage.getItem("TaskSaver")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("TaskSaver"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = (obj) => {
    localStorage.setItem("TaskSaver", JSON.stringify(obj))
  }

  const onSubmit = (data) => {
    const newTodo = ([...todos, { id: uuidv4(), Todo: data.item, isCompleted: false, Date: new Date().toUTCString() }])
    setTodos(newTodo)
    saveToLS(newTodo)
    visibleAlert({ type: 'success', message: `Todo added Successfully!!!` })
    reset()
  }

  const ToggleShowfinish = (id) => {
    let index = todos.findIndex((ele) => ele.id === id)
    let newTodo = [...todos]
    newTodo[index].isCompleted = !newTodo[index].isCompleted
    saveToLS(newTodo)
    setTodos(newTodo)
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((e) => {
      return e.id !== id
    })
    saveToLS(newTodos)
    setTodos(newTodos)
    visibleAlert({ type: 'success', message: `Todo Deleted Successfully!!!` })
  }

  const handleEdit = (e, id) => {
    let index = todos.findIndex((ele) => ele.id === id)
    let newTodo = todos[index]
    setAvailableTodo(newTodo)
  }

  const onUpdate = (data) => {
    const newTodo = { id: availableTodo.id, Todo: data.item, isCompleted: false, Date: availableTodo.Date }
    const updateTodos = todos.map((ele) => {
      if (ele.id === availableTodo.id) {
        return newTodo
      }
      else {
        return ele
      }
    })
    setTodos(updateTodos)
    saveToLS(updateTodos)
    visibleAlert({ type: 'success', message: `Todo Updated Successfully!!!` })
    reset()
    setAvailableTodo('')
  }


  return (
    <div className="w-full bg-[#e2dfef] md:p-3 md:px-5 p-2 font-[math]">
      <div className="">
        <div className='bg-violet-100 lg:w-[50%] md:w-[60%] sm:w-[80%] w-[95%]  m-auto flex justify-center min-h-[85vh] rounded-xl'>
          <div className="taskAdd w-full md:p-4 p-2">
            <h1 className='md:text-[33px] sm:text-[30px] text-[25px] w-fit m-auto font-bold my-2 font-[math] text-opacity-75 text-center'>TaskSaver - Manage your todos at one place</h1>
            <div className="input-add md:w-[95%] w-full m-auto pt-3">
              <h2 className='md:text-[25px] sm:text-[22px] text-[18px] font-bold my-1 text-gray-700'>Add a Todo</h2>
              {
                availableTodo ?
                  (<form onSubmit={handleSubmit(onUpdate)}>
                    <div className="flex items-start md:gap-3">
                      <div className='flex flex-col gap-1 w-full p-2'>
                        <input defaultValue={availableTodo.Todo || ""} {...register("item", { required: { value: true, message: 'This field is required*' }, minLength: { value: 3, message: 'Todo must have at least 3 alpha characters*' } })} className='w-full p-1 px-3 rounded-full' />
                        <div className="errorMessage md:w-full w-[150%] md:h-6 md:px-3  rounded-full text-red-900 font-semibold">{errors.item && <span>{errors.item.message}</span>}
                        </div>
                      </div>
                      <button type="submit" className='text-white m-2 rounded-2xl ml-0 p-1 px-3 bg-violet-800 hover:bg-violet-950 '>Update</button>
                    </div>
                  </form>)
                  :
                  (<form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-start md:gap-3 ">
                      <div className='flex flex-col gap-1 w-full p-2'>
                        <input defaultValue={''} {...register("item", { required: { value: true, message: 'This field is required*' }, minLength: { value: 3, message: 'Todo must have at least 3 alpha characters*' } })} className='w-full p-1 px-3 rounded-full' />
                        <div className="errorMessage md:w-full w-[150%] md:h-6 md:px-3  rounded-full text-red-900 font-semibold">{errors.item && <span>{errors.item.message}</span>}
                        </div>
                      </div>
                      <button type="submit" className='text-white m-2 rounded-2xl ml-0 p-1 px-3 bg-violet-800 hover:bg-violet-950 '>Submit</button>
                    </div>
                  </form>)
              }
            </div>

            <div className="md:w-[95%] m-auto ">
              <div className="checkme flex gap-2 items-center">
                <input type="checkbox" name="ShowFinished" checked={showFinished} onChange={() => { setShowFinished((item) => !item) }} id="Show Finished" />
                <label htmlFor="Show Finished">Show Finished</label>
              </div>

              <div className="lines m-auto w-[90%] h-[1px] my-5 bg-gray-400"></div>
            </div>

            <div className="your-task md:w-[95%] m-auto ">
              <h2 className='md:text-[25px] sm:text-[22px] text-[18px] font-bold my-1 text-gray-700 '>Your Todos</h2>
              <div>{showFinished && todos.length === 0 && <div className='p-5 text-[19px] text-slate-700'>No Todos to display</div>}</div>
              <div>{todos.map((item) => {
                return (showFinished || !item.isCompleted) && <TodoItem key={item.id} item={item} ToggleShowfinish={ToggleShowfinish} handleDelete={handleDelete} handleEdit={handleEdit} />
              })}</div>
              <div>{!showFinished && todos.every(item => item.isCompleted) && (
                <div className='p-5 text-[19px] text-slate-700'>No Todos to display</div>
              )}</div>
            </div>
          </div>
        </div >
      </div >
    </div >
  )
}

export default Main