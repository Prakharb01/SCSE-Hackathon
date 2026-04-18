import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import LandingPage from "./LandingPage.jsx";
import EmploymentGrid from "./Employment.jsx";
import LoginPage from "./LoginPage.jsx";
import Exchange from "./Exchange.jsx";
import ThePulse from "./ThePulse.jsx";
import Identity from "./Identity.jsx"
import Ranking from "./Ranking.jsx"

const isAuthenticated = () => typeof window !== 'undefined' && !!localStorage.getItem('auth');

const RequireAuth = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const RedirectIfAuth = () => {
  return isAuthenticated() ? <Navigate to="/app" replace /> : <LoginPage />;
};

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout/>,
//     children: [
//       {
//         path: "",
//         element: <Home />
//       },
//       {
//         path: "about",
//         element: <About />
//       },
//       {
//         path: "contact",
//         element: <Contact />
//       }
//     ]
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Navigate to="/login" replace />} />
      <Route path='/login' element={<RedirectIfAuth />} />
      <Route path='/app' element={<RequireAuth><Layout /></RequireAuth>}>
        <Route index element={<LandingPage />} />
        <Route path='employment' element={<EmploymentGrid />} />
        <Route path='exchange' element={<Exchange />} />
        <Route path='ranking' element={<Ranking />} />
        <Route path='identity' element={<Identity />} />
        <Route path='thepulse' element={<ThePulse />} />
      </Route>
      <Route path='*' element={<Navigate to="/login" replace />} />
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)