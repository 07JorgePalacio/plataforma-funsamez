import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Heart } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/login/', {
        email: email,
        password: password
      });

      localStorage.setItem('access_token', response.data.tokens.access);
      localStorage.setItem('refresh_token', response.data.tokens.refresh);
      localStorage.setItem('user_role', response.data.user.role); 
      localStorage.setItem('user_name', response.data.user.full_name);

      navigate('/dashboard'); 

    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Error al iniciar sesión");
      } else {
        setError("No se pudo conectar con el servidor.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-beige p-4">
      
      {/* --- BLOQUE 1: CABECERA (AFUERA DE LA TARJETA) --- */}
      <div className="flex flex-col items-center mb-8 max-w-md text-center">
        {/* Logo Flotante */}
        <div className="bg-gradient-to-br from-brand-gold to-yellow-600 p-4 rounded-2xl mb-6 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
          <Heart className="w-10 h-10 text-white fill-current" />
        </div>
        
        {/* Título y Descripción */}
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">Bienvenido</h1>
        <p className="text-gray-500 text-base">
          Ingresa tus credenciales para acceder al portal de <span className="font-semibold text-brand-gold">FUNSAMEZ</span>
        </p>
      </div>

      {/* --- BLOQUE 2: TARJETA DEL FORMULARIO --- */}
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 md:p-10 border border-gray-100">
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 mb-6 text-sm rounded-lg border border-red-100 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Correo electrónico</label>
            <input 
              type="email" 
              placeholder="ejemplo@funsamez.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 outline-none transition-all bg-gray-50 focus:bg-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">Contraseña</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/10 outline-none transition-all bg-gray-50 focus:bg-white"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-brand-gold transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-brand-gold hover:bg-[#b08d55] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-gold/30 transition-all transform active:scale-95 mt-4 text-lg"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            ¿Aún no eres parte del equipo? <br/>
            <Link to="/register" className="text-brand-gold font-bold hover:text-[#b08d55] transition-colors inline-block mt-1">
              Regístrate como voluntario
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;