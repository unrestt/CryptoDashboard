import { Route, Routes } from 'react-router-dom'
import './App.css'
import {Toaster} from 'react-hot-toast'

function App() {

  return (
    <>
      <Toaster position='top-center'/>
      <Routes>
        <Route path='/'/>
        <Route path='*' element={<div>Strona nie istnieje</div>}/>
      </Routes>
    </>
  )
}

export default App
