// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaRegClock, FaLock, FaUser } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showModal, setShowModal] = useState(false); // "아쉽군요" 모달 상태

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: 백엔드 연결 시 여기서 axios.post('/login', formData) 호출
    console.log('로그인 시도:', formData);
    navigate('/dashboard'); // 로그인 성공 시 대시보드로 이동
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* 로고 영역 */}
        <div style={styles.logoArea}>
          <FaRegClock size={40} color="#a29bfe" />
          <h1 style={styles.title}>Elyong</h1>
        </div>
        <p style={styles.subtitle}>일어나세요, 용사여.</p>

        {/* 로그인 폼 */}
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <FaUser color="#666" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <FaLock color="#666" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.loginBtn}>LOGIN</button>
        </form>

        {/* 링크 영역 */}
        <div style={styles.links}>
          <span style={styles.linkText} onClick={() => setShowModal(true)}>
            비밀번호를 잊으셨나요?
          </span>
          <span style={{ color: '#444' }}>|</span>
          <Link to="/signup" style={styles.linkText}>회원가입</Link>
        </div>
      </div>

      {/* ⭐ 아쉽군요 모달 */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: '#a29bfe', marginBottom: '10px' }}>알림</h2>
            <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>아쉽군요.</p>
            <button style={styles.modalBtn} onClick={() => setShowModal(false)}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#1e1e1e',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#252525',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
    textAlign: 'center',
  },
  logoArea: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginBottom: '10px' },
  title: { fontSize: '2rem', margin: 0 },
  subtitle: { color: '#888', marginBottom: '30px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: '0 15px',
    borderRadius: '10px',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '15px 0',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    outline: 'none',
    fontSize: '1rem',
  },
  loginBtn: {
    marginTop: '10px',
    padding: '15px',
    backgroundColor: '#a29bfe',
    border: 'none',
    borderRadius: '10px',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: '0.2s',
  },
  links: { marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '15px', fontSize: '0.9rem' },
  linkText: { color: '#aaa', cursor: 'pointer', textDecoration: 'none' },
  
  // 모달 스타일
  modalOverlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#2d2d2d',
    padding: '30px 50px',
    borderRadius: '15px',
    textAlign: 'center',
    border: '1px solid #a29bfe',
    minWidth: '300px',
  },
  modalBtn: {
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
    border: '1px solid #555',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default Login;