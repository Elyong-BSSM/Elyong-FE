// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AlarmEditor from './pages/AlarmEditor'; // 1. 새로 만든 페이지 불러오기

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인 대시보드 */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* 2. 알람 추가 및 수정 경로 추가 */}
        <Route path="/alarms/new" element={<AlarmEditor />} />
        <Route path="/alarms/:id" element={<AlarmEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;