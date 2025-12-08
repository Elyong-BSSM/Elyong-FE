import { useState } from 'react';
import { FaPlus, FaRegClock, FaTrash } from 'react-icons/fa';
import { formatDays } from '../utils/format';

const Dashboard = () => {
  // 1. 상태 관리
  const [selectedId, setSelectedId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // 더미 데이터 (시안에 있는 10:80, 07:00 반영)
  const [alarms, setAlarms] = useState([
    {
      id: 1,
      time: "10:80", 
      date: "0001000", // 목요일
      enabled: true,   // ON 상태 (보라색)
      audio: "basic",
      minEyeSize: 50,
      goalScore: 80
    },
    {
      id: 2,
      time: "07:00",
      date: "1111111", // 매일
      enabled: false,  // OFF 상태 (회색)
      audio: "army",
      minEyeSize: 50,
      goalScore: 50
    }
  ]);

  // 폼 데이터
  const [formData, setFormData] = useState({
    time: "07:00",
    days: Array(7).fill(false),
    audio: "basic",
    minEyeSize: 50,
    goalScore: 50
  });

  const dayLabels = ['월', '화', '수', '목', '금', '토', '일'];

  // (+) 버튼: 새 알람
  const handleAddNew = () => {
    setSelectedId(null);
    setIsEditing(true);
    setFormData({
      time: "07:00",
      days: Array(7).fill(false),
      audio: "basic",
      minEyeSize: 50,
      goalScore: 50
    });
  };

  // 알람 카드 클릭 (수정 모드)
  const handleSelectAlarm = (alarm) => {
    setSelectedId(alarm.id);
    setIsEditing(true);
    const daysArray = alarm.date.split('').map(char => char !== '-');
    setFormData({
      time: alarm.time,
      days: daysArray,
      audio: alarm.audio || "basic",
      minEyeSize: alarm.minEyeSize || 50,
      goalScore: alarm.goalScore || 50
    });
  };

  // 폼 핸들러
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleDay = (index) => {
    const newDays = [...formData.days];
    newDays[index] = !newDays[index];
    handleChange('days', newDays);
  };

  const handleSave = () => {
    const dateString = formData.days.map(d => d ? '1' : '-').join('');
    if (selectedId) {
      setAlarms(alarms.map(alarm => 
        alarm.id === selectedId ? { ...alarm, ...formData, date: dateString } : alarm
      ));
    } else {
      const newAlarm = { id: Date.now(), ...formData, date: dateString, enabled: true };
      setAlarms([...alarms, newAlarm]);
    }
    setIsEditing(false);
    setSelectedId(null);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if(window.confirm("정말 삭제하시겠습니까?")) {
      setAlarms(alarms.filter(a => a.id !== id));
      if (selectedId === id) { setIsEditing(false); setSelectedId(null); }
    }
  };

  // ⭐ 토글 버튼 전용 핸들러 (UI 즉시 반영)
  const handleToggle = (e, id) => {
    e.stopPropagation(); // 카드 클릭 이벤트 막기
    setAlarms(alarms.map(alarm => 
      alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
    ));
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logoArea}>
          <FaRegClock style={{ marginRight: '10px', color: '#a29bfe' }} /> 
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Elyong</span>
        </div>
        <div style={styles.authLinks}>LOGIN | SIGN UP</div>
      </header>

      <div style={styles.body}>
        {/* 왼쪽 패널: 알람 리스트 */}
        <div style={styles.leftPanel}>
          <div style={styles.plusContainer}>
             <button style={styles.plusBtn} onClick={handleAddNew}><FaPlus /></button>
          </div>

          <div style={styles.alarmList}>
            {alarms.map(alarm => (
              <div 
                key={alarm.id} 
                onClick={() => handleSelectAlarm(alarm)}
                style={{
                  ...styles.alarmCard,
                  // 선택된 알람이면 테두리 표시
                  border: selectedId === alarm.id ? '1px solid #a29bfe' : '1px solid transparent'
                }}
              >
                {/* 시간 및 요일 텍스트 */}
                <div style={styles.cardInfo}>
                  <div style={{
                    ...styles.cardTime,
                    color: alarm.enabled ? '#fff' : '#666' // ON이면 흰색, OFF면 회색
                  }}>
                    {alarm.time}
                  </div>
                  <div style={styles.cardDate}>{formatDays(alarm.date)}</div>
                </div>

                {/* 우측 컨트롤 (휴지통 + 토글) */}
                <div style={styles.cardActions}>
                   <button style={styles.deleteBtn} onClick={(e) => handleDelete(e, alarm.id)}>
                     <FaTrash />
                   </button>
                   
                   {/* ⭐ 커스텀 토글 스위치 */}
                   <div 
                     style={{
                       ...styles.toggleTrack,
                       backgroundColor: alarm.enabled ? '#8c7ae6' : '#555' // 켜지면 보라색
                     }}
                     onClick={(e) => handleToggle(e, alarm.id)}
                   >
                     <div style={{
                       ...styles.toggleKnob,
                       transform: alarm.enabled ? 'translateX(24px)' : 'translateX(0)'
                     }} />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽 패널: 설정 폼 */}
        <div style={styles.rightPanel}>
          {!isEditing ? (
            <div style={styles.emptyState}>
              <p>알람을 선택하거나 (+) 버튼을 누르세요.</p>
            </div>
          ) : (
            <div style={styles.formContainer}>
              <h3 style={styles.formTitle}>{selectedId ? 'EDIT ALARM' : 'NEW ALARM'}</h3>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>시간</label>
                <input type="time" value={formData.time} onChange={(e) => handleChange('time', e.target.value)} style={styles.inputTime}/>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>요일</label>
                <div style={styles.daySelector}>
                  {dayLabels.map((day, idx) => (
                    <button key={day} onClick={() => toggleDay(idx)} style={{...styles.dayBtn, background: formData.days[idx] ? '#a29bfe' : '#333', color: formData.days[idx] ? '#fff' : '#888'}}>
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>음향</label>
                <select style={styles.select} value={formData.audio} onChange={(e) => handleChange('audio', e.target.value)}>
                  <option value="basic">기본 알람</option>
                  <option value="sans">샌즈전 브금</option>
                  <option value="army">기상 나팔</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <div style={styles.labelRow}><label style={styles.label}>눈 크기 ({formData.minEyeSize}%)</label></div>
                <input type="range" min="0" max="100" value={formData.minEyeSize} onChange={(e) => handleChange('minEyeSize', e.target.value)} style={styles.slider}/>
              </div>

              <div style={styles.formGroup}>
                <div style={styles.labelRow}><label style={styles.label}>목표 점수 ({formData.goalScore})</label></div>
                <input type="range" min="0" max="1000" step="10" value={formData.goalScore} onChange={(e) => handleChange('goalScore', e.target.value)} style={styles.slider}/>
              </div>

              <button style={styles.saveBtn} onClick={handleSave}>SAVE</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', backgroundColor: '#1e1e1e', color: '#fff', display: 'flex', flexDirection: 'column' },
  header: { height: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 30px', borderBottom: '1px solid #333' },
  logoArea: { display: 'flex', alignItems: 'center' },
  authLinks: { fontSize: '0.8rem', color: '#aaa', letterSpacing: '1px' },
  
  body: { flex: 1, display: 'flex' },
  
  // 왼쪽 패널
  leftPanel: { flex: 1.5, padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#1e1e1e', overflowY: 'auto' },
  plusContainer: { marginBottom: '30px' },
  plusBtn: { width: '60px', height: '60px', borderRadius: '50%', border: 'none', backgroundColor: '#2d2d2d', color: '#888', fontSize: '1.5rem', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.3)', transition: '0.2s' },
  
  alarmList: { width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' },
  
  // 알람 카드 스타일 (디자인 이미지 반영)
  alarmCard: { 
    width: '100%', maxWidth: '450px', 
    backgroundColor: '#252525', 
    padding: '25px 30px', 
    borderRadius: '20px', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    cursor: 'pointer', 
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    transition: '0.3s'
  },
  cardInfo: { display: 'flex', flexDirection: 'column' },
  cardTime: { fontSize: '3.5rem', fontWeight: '200', fontFamily: 'sans-serif', transition: '0.3s' },
  cardDate: { fontSize: '0.9rem', color: '#666', marginTop: '5px' },
  
  cardActions: { display: 'flex', alignItems: 'center', gap: '20px' },
  deleteBtn: { background: 'none', border: 'none', color: '#d63031', fontSize: '1.2rem', cursor: 'pointer', opacity: 0.6 },
  
  // 토글 스위치 (ON: 보라색, OFF: 회색)
  toggleTrack: { 
    width: '50px', height: '26px', 
    borderRadius: '15px', 
    position: 'relative', 
    cursor: 'pointer', 
    transition: 'background-color 0.3s ease'
  },
  toggleKnob: { 
    width: '20px', height: '20px', 
    backgroundColor: '#fff', 
    borderRadius: '50%', 
    position: 'absolute', 
    top: '3px', left: '3px', 
    transition: 'transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)' 
  },

  // 오른쪽 패널
  rightPanel: { flex: 1, backgroundColor: '#252525', padding: '40px', borderLeft: '1px solid #333' },
  emptyState: { height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#555' },
  formContainer: { display: 'flex', flexDirection: 'column', gap: '30px' },
  formTitle: { fontSize: '1.5rem', fontWeight: 'bold', color: '#ddd', marginBottom: '10px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '10px' },
  label: { color: '#888', fontSize: '0.9rem' },
  labelRow: { display: 'flex', justifyContent: 'space-between', color: '#888', fontSize: '0.9rem' },
  inputTime: { backgroundColor: '#333', border: 'none', color: '#fff', padding: '15px', borderRadius: '10px', fontSize: '1.5rem', outline: 'none' },
  daySelector: { display: 'flex', gap: '5px' },
  dayBtn: { flex: 1, padding: '10px 0', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  select: { backgroundColor: '#333', border: 'none', color: '#fff', padding: '15px', borderRadius: '10px', outline: 'none' },
  slider: { width: '100%', height: '5px', backgroundColor: '#444', outline: 'none', cursor: 'pointer' },
  saveBtn: { marginTop: '20px', backgroundColor: '#a29bfe', color: '#fff', border: 'none', padding: '15px', borderRadius: '10px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }
};

export default Dashboard;