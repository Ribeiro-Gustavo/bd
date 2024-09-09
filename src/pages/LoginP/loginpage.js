import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Importar o hook useNavigate
import { auth } from '../../firebaseConnection'; // Ajuste o caminho conforme necessário
import './loginpage.css';

const LoginT = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Inicializar o hook useNavigate

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      console.log("Usuário logado com sucesso");
      navigate('/home'); // Redirecionar para a página inicial após login
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Email ou senha incorretos");
    }
  }

  return (
    <div className="caixa-login">
      <div className="cabecalho-login">
        <header>Login</header>
      </div>
      <div className="caixa-input">
        <input 
          type="text" 
          className="campo-input" 
          placeholder="Email" 
          autoComplete="off" 
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="caixa-input">
        <input 
          type="password" 
          className="campo-input" 
          placeholder="Senha" 
          autoComplete="off" 
          required
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="esqueci">
        <section>
          <input type="radio" id="lembrar"/>
          <label htmlFor="lembrar">Lembrar de mim</label>
        </section>
        <section>
          <a href="#">Esqueci minha senha</a>
        </section>
      </div>
      <div className="caixa-submit">
        <button className="botao-submit" id="entrar" onClick={handleLogin}></button>
        <label htmlFor="entrar">Entrar</label>
      </div>
      <div className="link-registrar">
        <p>Ainda não tem uma conta? <a href="#">Registrar-se</a></p>
      </div>
    </div>
  );
}

export default LoginT;
