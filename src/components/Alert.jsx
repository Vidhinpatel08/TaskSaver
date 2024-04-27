import React, { useContext } from 'react'
import { alertContext } from '../context/Context'

const Alert = ({ visibleAlertBox }) => {
    const { alertMessage } = useContext(alertContext)
    return (
        <>
            {visibleAlertBox && (<div className={`box w-fit fixed md:top-16 md:right-4 md:p-3 top-14 right-2 p-3 font-bold justify-end rounded-lg ${alertMessage.type === 'success' ? 'bg-green-400' :'bg-red-400'}`}>
                <span className="container"><span>{alertMessage.message}</span></span>
            </div>)}
        </>
    )
}

export default Alert
