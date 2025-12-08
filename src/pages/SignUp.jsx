// src/pages/Signup.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserPlus, FaLock, FaUser } from 'react-icons/fa';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 서로 다릅니다!");
      return;
    }
    // TODO: 백엔드 연결 (axios.post('/users', ...))
    alert("가입을 환영합니다, 용사여.");
    navigate('/login'); // 가입 성공 시 로그인 페이지로
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <FaUserPlus size={30} color="#a29bfe" />
          <h1 style={styles.title}>Sign Up</h1>
        </div>

        <form onSubmit={handleSignup} style={styles.form}>
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
          <div style={styles.inputGroup}>
            <FaLock color="#a29bfe" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.signupBtn}>JOIN US</button>
        </form>

        <div style={styles.footer}>
          <span>이미 계정이 있으신가요? </span>
          <Link to="/login" style={styles.link}>로그인하기</Link>
        </div>
      </div>
    </div>
  );
};

// 스타일 (로그인 페이지와 유사하게 통일)
const styles = {
  container: { height: '100vh', backgroundColor: '#1e1e1e', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff' },
  card: { width: '100%', maxWidth: '400px', backgroundColor: '#252525', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', textAlign: 'center' },
  header: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '30px' },
  title: { fontSize: '1.8rem', margin: 0 },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  inputGroup: { display: 'flex', alignItems: 'center', backgroundColor: '#333', padding: '0 15px', borderRadius: '10px', gap: '10px' },
  input: { flex: 1, padding: '15px 0', backgroundColor: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '1rem' },
  signupBtn: { marginTop: '10px', padding: '15px', backgroundColor: '#a29bfe', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' },
  footer: { marginTop: '20px', fontSize: '0.9rem', color: '#888' },
  link: { color: '#a29bfe', textDecoration: 'none', fontWeight: 'bold', marginLeft: '5px' }
};

export default Signup;