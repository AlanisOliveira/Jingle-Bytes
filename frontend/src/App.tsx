import { Routes } from "react-router"
import { routes } from "./utils/routes"
import { Route } from "react-router-dom"



function App() {


  return (
    <>
      <Routes>
        {Object.values(routes).map((l) => <Route key={l.route} path={l.route} element={<l.element />} />)}
       
      </Routes>
    </>
  )
}

export default App
