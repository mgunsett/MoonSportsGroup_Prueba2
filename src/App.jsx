import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Navbar from './components/Navbar/Navbar'
import CustomCursor from './components/CustomCursor'
import HomePage from './pages/HomePage'
import JugadoresPage from './pages/JugadoresPage'

function App() {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <Box bg="brand.black" minH="100vh" position="relative">
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jugadores" element={<JugadoresPage />} />
      </Routes>
    </Box>
  )
}

export default App
