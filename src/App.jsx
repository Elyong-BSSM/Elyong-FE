// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';   // 추가
import Signup from './pages/Signup'; // 추가

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 경로를 로그인 페이지로 설정 */}
        <Route path="/" element={<Login />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* 대시보드는 이제 로그인을 해야 볼 수 있는 느낌 */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;