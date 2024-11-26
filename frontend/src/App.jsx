import { Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
// import UpdatePage from './pages/UpdatePage'
// import DeletePage from './pages/DeletePage'
import Navbar from './components/Navbar'
import { Box,useColorModeValue } from '@chakra-ui/react'

function App() {

  return (
    <>
      <Box minH="100vh" bg={useColorModeValue("gray.100","gray.900")}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          {/* <Route path="/update" element={<UpdatePage />} />
          <Route path="/delete" element={<DeletePage />} /> */}
        </Routes>
      </Box>
    </>
  )
}

export default App
