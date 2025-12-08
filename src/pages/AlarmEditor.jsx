// src/pages/AlarmEditor.jsx
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaVolumeUp } from 'react-icons/fa';

const AlarmEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에 id가 있으면 수정 모드, 없으면 생성 모드

  // 1. 입력 상태 관리
  const [time, setTime] = useState("07:00");
  const [days, setDays] = useState([true, true, true, true, true, false, false]); // 월~금 기본 선택
  const [difficulty, setDifficulty] = useState(50); // 0 ~ 100

  // 요일 텍스트 배열
  const dayLabels = ['월', '화', '수', '목', '금', '토', '일'];

  // 요일 토글 함수
  const toggleDay = (index) => {
    const newDays = [...days];
    newDays[index] = !newDays[index];
    setDays(newDays);
  };

  // 저장 버튼 클릭 시 실행
  const handleSave = () => {
    // 요일 배열(true/false)을 "101..." 문자열로 변환
    const dateString = days.map(d => d ? '1' : '-').join('');
    
    const newAlarm = {
      time,
      date: dateString,
      goalScore: difficulty * 10, // 난이도 * 10 = 목표 점수
      minEyeSize: 0.5, // 기본값
      enabled: true
    };

    console.log("서버로 보낼 데이터:", newAlarm);
    alert("퀘스트가 저장되었습니다!");
    navigate('/dashboard'); // 저장 후 대시보드로 이동
  };

  return (
    <div style={styles.page}>
      {/* 상단 네비게이션 */}
      <header style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <h2 style={{ margin: 0 }}>{id ? 'EDIT QUEST' : 'NEW QUEST'}</h2>
        <button style={styles.saveBtn} onClick={handleSave}>
          <FaSave />
        </button>
      </header>

      {/* 1. 시간 설정 */}
      <div style={styles.section}>
        <label style={styles.label}>기상 시간</label>
        <input 
          type="time" 
          value={time} 
          onChange={(e) => setTime(e.target.value)}
          style={styles.timeInput}
        />
      </div>

      {/* 2. 요일 반복 설정 */}
      <div style={styles.section}>
        <label style={styles.label}>반복 요일</label>
        <div style={styles.dayContainer}>
          {dayLabels.map((label, index) => (
            <button
              key={label}
              onClick={() => toggleDay(index)}
              style={{
                ...styles.dayBtn,
                backgroundColor: days[index] ? 'var(--primary-color)' : '#333',
                color: days[index] ? '#000' : '#888',
                borderColor: days[index] ? 'var(--primary-color)' : '#444'
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. 난이도 (눈 점수) 설정 */}
      <div style={styles.section}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <label style={styles.label}>난이도 (목표 점수)</label>
          <span style={{color: 'var(--accent-color)', fontWeight:'bold'}}>
            {difficulty > 80 ? 'HELL 🔥' : difficulty > 40 ? 'NORMAL 😐' : 'EASY 🐣'}
          </span>
        </div>
        
        <input 
          type="range" 
          min="10" max="100" 
          value={difficulty} 
          onChange={(e) => setDifficulty(e.target.value)}
          style={styles.slider}
        />
        <p style={{textAlign:'right', fontSize:'0.8rem', color:'#888', marginTop:'5px'}}>
          목표 점수: {difficulty * 10}pts
        </p>
      </div>

      {/* 4. 알람음 설정 (UI만 구현) */}
      <div style={styles.section}>
        <label style={styles.label}>알람음</label>
        <div style={styles.audioBox}>
          <FaVolumeUp color="#aaa" />
          <select style={styles.select}>
            <option>기본: 빠빠빠 굿모닝</option>
            <option>샌즈전 브금 (Megalovania)</option>
            <option>군대 기상 나팔</option>
          </select>
        </div>
      </div>

    </div>
  );
};

const styles = {
  page: { padding: '20px', maxWidth: '600px', margin: '0 auto', minHeight: '100vh', backgroundColor: '#1a1a1a' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' },
  backBtn: { background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' },
  saveBtn: { background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '1.5rem', cursor: 'pointer' },
  
  section: { marginBottom: '30px', backgroundColor: '#262626', padding: '20px', borderRadius: '12px' },
  label: { display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '10px' },
  
  timeInput: { 
    width: '100%', padding: '10px', fontSize: '2.5rem', 
    backgroundColor: 'transparent', border: 'none', color: '#fff', 
    textAlign: 'center', fontFamily: 'monospace', fontWeight: 'bold',
    outline: 'none'
  },
  
  dayContainer: { display: 'flex', justifyContent: 'space-between', gap: '5px' },
  dayBtn: { 
    flex: 1, padding: '10px 0', borderRadius: '8px', border: '1px solid', 
    cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem', transition: '0.2s'
  },
  
  slider: { width: '100%', height: '6px', borderRadius: '5px', background: '#444', outline: 'none', marginTop: '10px' },
  
  audioBox: { display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#333', padding: '10px', borderRadius: '8px' },
  select: { flex: 1, backgroundColor: 'transparent', border: 'none', color: '#fff', fontSize: '1rem', outline: 'none' }
};

export default AlarmEditor;