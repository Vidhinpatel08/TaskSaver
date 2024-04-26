import React, { useEffect, useState } from 'react'
import TodoItem from './TodoItem';

const YourTodos = () => {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        let todoString = localStorage.getItem("TaskSaver")
        if (todoString) {
            let todos = JSON.parse(localStorage.getItem("TaskSaver"))
            setTodos(todos)
        }
    }, [])

    // Parse dates and sort todos
    const sortedTodos = [...todos].sort((a, b) => new Date(b.Date) - new Date(a.Date));

    // Group todos by date
    const groupedTodos = sortedTodos.reduce((acc, todo) => {
        const dateKey = new Date(todo.Date).toDateString();
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(todo);
        return acc;
    }, {});

    return (
        <>
            <div className="w-full bg-[#e2dfef] p-3 px-5 font-[math] text-opacity-75">
                <div className="">
                    <div className='bg-violet-100 lg:w-[50%] md:w-[60%] sm:w-[80%] w-[95%] m-auto flex justify-center min-h-[85vh] rounded-xl'>
                        <div className="taskAdd w-full ">
                            <h1 className='md:text-[33px] sm:text-[30px] text-[25px] w-fit m-auto font-bold my-2 font-[math] text-opacity-75 flex items-center justify-center'>TaskSaver - Manage your todos at one place</h1>
                            <div className="your-task w-[95%] m-auto mt-2 ">
                                <h2 className='md:text-[30px] sm:text-[28px] text-[25px] font-bold text-center font-[math]'>Your Todos</h2>
                                <div>{Object.entries(groupedTodos).map(([date, todos]) => (
                                    <div key={date}>
                                        <div className="mainTodosDisplay my-8">
                                            <h3 className=" font-semibold text-[20px] text-slate-700 font-[oblique]">{`${date.split(' ')[2]} ${date.split(' ')[1]}, ${date.split(' ')[3]}`}</h3>
                                            <div className="lines m-auto w-full h-[3px] my-2 bg-gray-400 font-serif"></div>
                                            {todos.map(todo => (
                                                <TodoItem
                                                    key={todo.id}
                                                    item={todo}
                                                    typeBox={true}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                ))}
                                    {todos.length === 0 && <div className='p-5 text-[19px] text-slate-700'>No Todos to display</div>}</div >
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        </>
    )
}

export default YourTodos