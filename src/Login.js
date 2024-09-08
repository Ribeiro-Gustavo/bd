<div className="container">
<h2>Usuarios</h2>

<label>Email</label>
<input 
  value={email}
  onChange={(e) => setEmail(e.target.value)} 
  placeholder="Digite um email"
/> <br/>

<label>Senha</label>
<input 
  value={senha}
  onChange={(e) => setSenha(e.target.value)} 
  placeholder="Informe sua senha"
/> <br/> 

<button onClick={novoUsuario}>Cadastrar</button>     
<button onClick={logarUsuario}>Fazer login</button>     
</div>