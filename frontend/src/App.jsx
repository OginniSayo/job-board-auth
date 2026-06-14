import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import JobsPage from './pages/JobsPage'
import CreateJobPage from './pages/CreateJobPage'
import JobDetailsPage from './pages/JobDetailsPage'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "synthwave"
  );

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "synthwave";
    document.documentElement.setAttribute("data-theme", saved);
  }, [theme]);

  return (
    <>
      <div className="relative h-full w-full font-grotesk">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,0,182,.45),rgba(255,255,255,0))]"></div>
      

        <Routes>
          <Route path="/"           element={<HomePage       />} />
          <Route path="/register"   element={<RegisterPage   />} />
          <Route path="/login"      element={<LoginPage      />} />
          <Route path="/jobs/:name" element={<JobsPage       />} />
          <Route path="/job/create" element={<CreateJobPage  />} />
          <Route path="/job/:jobId" element={<JobDetailsPage />} />
          <Route path="*"           element={<NotFoundPage   />} />
        </Routes>
      </div>
    </>
  )
}

export default App

