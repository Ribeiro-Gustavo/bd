// src/App.jsx
import React from 'react';
import { useAppLogic } from './logic';
import "./home.css";

const App = () => {
  const {
    descricao, setDescricao,
    autor, setAutor,
    idtarefa, setIdTarefa,
    email, setEmail,
    senha, setSenha,
    user, userDetail,
    tarefas,
    handleAdd,
    buscarTarefa,
    editarTarefa,
    excluirTarefa,
    novoUsuario,
    logarUsuario,
    fazerLogout
  } = useAppLogic(); // Uso do hook personalizado

  return (
    <div>
      <h1>Lista de tarefas</h1>

      {user && (
        <div>
          <strong>Seja bem-vindo(a) (Você está logado!)</strong> <br />
          <span>ID: {userDetail.uid} - Email: {userDetail.email}</span> <br />
          <button onClick={fazerLogout}>Sair da conta</button>
          <br /> <br />
        </div>
      )}

      <div className="container">
        <h2>LISTA</h2>

        <label>Número da tarefa:</label>
        <input
          placeholder='Digite o Número da tarefa'
          value={idtarefa}
          onChange={(e) => setIdTarefa(e.target.value)}
        /> <br />

        <label>Descrição:</label>
        <textarea
          type="text"
          placeholder='Digite a descrição'
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <label>Autor:</label>
        <input
          type="text"
          placeholder="Autor da Tarefa"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscarTarefa}>Buscar tarefa</button>
        <button onClick={editarTarefa}>Atualizar tarefa</button>

        <ul className="task-list">
          {tarefas.map((tarefa) => {
            return (
              <li key={tarefa.id}>
                <strong>ID: {tarefa.id}</strong>
                <span>Descrição: {tarefa.descricao} </span>
                <span>Autor: {tarefa.autor}</span>
                <button onClick={() => excluirTarefa(tarefa.id)}>Excluir</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
