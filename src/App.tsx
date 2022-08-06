import { Navigate, Route, Routes } from "react-router-dom"
import Header from "./components/header/Header"
import Feed from "./pages/feed/Feed"


const App = () => {

  return (
    <div className="flex flex-col h-screen w-screen items-center">
      <Header/>
      <div className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/feed" />}/>
          <Route path="/feed" element={<Feed/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
