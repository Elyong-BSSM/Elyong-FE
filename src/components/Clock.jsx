// src/components/Clock.jsx
import { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // 1초마다 시간 갱신
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer); // 컴포넌트 사라질 때 청소
  }, []);

  // 시간 포맷팅 (00:00:00)
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour12: false });
  };

  // 날짜 포맷팅 (YYYY-MM-DD Weekday)
  const formatDate = (date) => {
    return date.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      weekday: 'long' 
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.date}>{formatDate(time)}</div>
      <div style={styles.time}>{formatTime(time)}</div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '2rem 0',
    padding: '2rem',
    border: '2px solid var(--primary-color)',
    borderRadius: '15px',
    backgroundColor: '#2d2d2d',
    boxShadow: '0 0 15px rgba(0, 210, 211, 0.3)', // 네온 효과
  },
  date: {
    fontSize: '1.2rem',
    color: '#aaaaaa',
    marginBottom: '0.5rem',
  },
  time: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    color: 'var(--primary-color)',
    letterSpacing: '5px',
    fontFamily: 'monospace', // 터미널 느낌
  }
};

export default Clock;