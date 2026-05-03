import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import ResultPage from './pages/ResultPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/result/:testId" element={<ResultPage />} />
    </Routes>
  )
}
