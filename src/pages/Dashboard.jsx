// src/pages/Dashboard.jsx
import { FaWifi, FaVideo, FaPlus, FaBell } from 'react-icons/fa'; // 아이콘 사용
import Clock from '../components/Clock';

const Dashboard = () => {
  return (
    <div style={styles.page}>
      {/* 1. 상단 헤더 */}
      <header style={styles.header}>
        <h2 style={{ margin: 0 }}>🎛️ CONTROL PANEL</h2>
        <div style={styles.statusBadges}>
          <span style={styles.badgeOn}><FaWifi /> RPi Connected</span>
          <span style={styles.badgeOn}><FaVideo /> Camera OK</span>
        </div>
      </header>

      {/* 2. 메인 시계 */}
      <Clock />

      {/* 3. 다음 알람 정보 (카드 형태) */}
      <div style={styles.sectionTitle}>NEXT MISSION</div>
      <div style={styles.alarmCard}>
        <div style={styles.alarmInfo}>
          <span style={styles.alarmLabel}>AM</span>
          <span style={styles.alarmTime}>07:00</span>
        </div>
        <div style={styles.alarmDetail}>
          <p>📅 월, 화, 수, 목, 금</p>
          <p>🔥 난이도: <span style={{color: 'var(--danger-color)'}}>HELL</span></p>
        </div>
        <FaBell size={24} color="var(--accent-color)" />
      </div>

      {/* 4. 액션 버튼들 */}
      <div style={styles.buttonGroup}>
        <button style={styles.mainButton}>
          <FaPlus /> 새 알람 추가
        </button>
      </div>
    </div>
  );
};

// 스타일 정의 (CSS-in-JS 방식)
const styles = {
  page: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #444',
    paddingBottom: '10px',
  },
  statusBadges: {
    display: 'flex',
    gap: '10px',
    fontSize: '0.8rem',
  },
  badgeOn: {
    backgroundColor: 'rgba(0, 210, 211, 0.2)',
    color: 'var(--primary-color)',
    padding: '5px 10px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    border: '1px solid var(--primary-color)',
  },
  sectionTitle: {
    color: '#888',
    fontSize: '0.9rem',
    marginBottom: '10px',
    marginTop: '30px',
  },
  alarmCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: '20px',
    borderRadius: '12px',
    borderLeft: '5px solid var(--accent-color)', // 왼쪽 포인트 컬러
  },
  alarmInfo: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '5px',
  },
  alarmLabel: {
    fontSize: '1rem',
    color: '#aaa',
  },
  alarmTime: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
  },
  alarmDetail: {
    fontSize: '0.9rem',
    color: '#ccc',
    lineHeight: '1.4',
  },
  buttonGroup: {
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'center',
  },
  mainButton: {
    backgroundColor: 'var(--primary-color)',
    color: '#000',
    border: 'none',
    padding: '15px 30px',
    fontSize: '1.1rem',
    borderRadius: '50px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 4px 15px rgba(0, 210, 211, 0.4)',
    transition: 'transform 0.2s',
  }
};

export default Dashboard;