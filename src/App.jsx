import { useState } from 'react'
import { alertContext } from './context/Context'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Main from './components/Main'
import Footer from './components/Footer'
import YourTodos from './components/YourTodos'
import Alert from './components/Alert'


function App() {
  const [alertMessage, setAlertMessage] = useState({ type: '', message: '' })
  const [visibleAlertBox, setVisibleAlertBox] = useState(false)
  const visibleAlert = (obj) => {
    setAlertMessage({ type: obj.type, message: obj.message })
    setVisibleAlertBox(true)
    setTimeout(() => {
      setVisibleAlertBox(false)
    }, 3000);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /><Alert visibleAlertBox={visibleAlertBox} /><Main /><Footer /></>,
      errorElement: <><Navbar /><Alert visibleAlertBox={visibleAlertBox} /> <Main /><Footer /></>,
    },
    {
      path: "/your-todo",
      element: <><Navbar /><Alert visibleAlertBox={visibleAlertBox} /> <YourTodos /><Footer /></>,
      errorElement: <><Navbar /><Alert visibleAlertBox={visibleAlertBox} /> <Main /><Footer /></>,
    },
  ])
  return (
    <>
      <alertContext.Provider value={{ alertMessage, visibleAlert }}>
        <RouterProvider router={router} />
      </alertContext.Provider>
    </>
  )
}

export default App
