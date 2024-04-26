import './App.css'
import Navbar from './components/Navbar'
import Main from './components/Main'
import Footer from './components/Footer'
import YourTodos from './components/YourTodos'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /> <Main /><Footer /></>,
      errorElement: <><Navbar /> <Main /><Footer /></>,
    },
    {
      path: "/your-todo",
      element: <><Navbar /> <YourTodos /><Footer /></>,
      errorElement: <><Navbar /> <Main /><Footer /></>,
    },
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
