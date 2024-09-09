import React from 'react';
import './login.css'; 

const LoginT = () => {
  return (
    <div className="caixa-login">
      <div className="cabecalho-login">
        <header>Login</header>
      </div>
      <div className="caixa-input">
        <input type="text" className="campo-input" placeholder="Email" autoComplete="off" required/>
      </div>
      <div className="caixa-input">
        <input type="password" className="campo-input" placeholder="Senha" autoComplete="off" required/>
      </div>
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
        <button className="botao-submit" id="entrar"></button>
        <label htmlFor="entrar">Entrar</label>
      </div>
      <div className="link-registrar">
        <p>Ainda não tem uma conta? <a href="#">Registrar-se</a></p>
      </div>
    </div>
  );
}

export default LoginT;
