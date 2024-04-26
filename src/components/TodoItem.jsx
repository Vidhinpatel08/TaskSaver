import React from 'react';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdVerified } from "react-icons/md";

const TodoItem = ({ item, ToggleShowfinish, handleDelete, handleEdit, typeBox }) => {
    return (
        <>
            <div className='flex  items-center'>
                <div className='w-11/12 flex h-fit p-2 m-1 text-xl gap-3 items-center'>
                    {typeBox && <div className={`${!item.isCompleted && 'text-transparent'}`}><MdVerified /></div>}
                    {!typeBox && (<input type="checkbox" checked={item.isCompleted} onChange={(e) => { ToggleShowfinish(item.id) }} name="finished" id="" />)}
                    <div className={`messageBox ${item.isCompleted && 'line-through'} ${!typeBox && 'text-lg'}`}>
                        {item.Todo}
                    </div>
                </div>
                {!typeBox && (<div className='w-22 m-auto  flex gap-3 p-1'>
                    <div className="icone text-xl bg-indigo-900 rounded-md cursor-pointer text-white p-[3px]" onClick={(e) => { handleEdit(e, item.id) }}><MdEdit /></div>
                    <div className="icone text-xl bg-indigo-900 rounded-md cursor-pointer text-white p-[3px]" onClick={(e) => { handleDelete(e, item.id) }}><MdDelete /></div>
                </div>)}
            </div>
            <div className="lines m-auto w-full h-[1px]  bg-gray-400"></div>
        </>
    )
}

export default TodoItem
