import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext'; 

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    setError('');
    try {
      const res = await api.post('/Auth/login', { username, password });
      const token = res.data.token;
      login(token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-[10%] p-6 rounded-xl shadow-xl">
      <h1 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r to-purple-600 from-blue-400">Login</h1>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          onClick={handleLogin}
          className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-xl text-xl px-5 py-2.5 text-center"
        >
          Login
        </button> 
      </form>

      <p className="text-sm text-center mt-4">
        Don&apos;t have an account?
        <button
          type="button"
          onClick={() => navigate('/register')}
          className="text-blue-600 underline ml-1"
        >
          Register
        </button>
      </p>
    </div>
  );
}