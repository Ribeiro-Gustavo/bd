import { useState, useEffect } from 'react'
import { db, auth } from './firebaseConnection';

import { 
  doc, 
  setDoc, 
  collection, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  onSnapshot
} from 'firebase/firestore'

import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

import './App.css';

function App() {
  const [descricao, setdescricao] = useState('');
  const [autor, setAutor] = useState('');
  const [idtarefa, setidtarefa] = useState('')

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [user, setUser] = useState(false);
  const [userDetail, setUserDetail] = useState({})

  const [tarefas, settarefas] = useState([]);

  useEffect(() => {
    async function loadtarefas(){
      const unsub = onSnapshot(collection(db, "tarefas"), (snapshot) => {
        let listatarefa = [];

        snapshot.forEach((doc) => {
          listatarefa.push({
            id: doc.id,
            descricao: doc.data().descricao,
            autor: doc.data().autor,
          })
        })
  
        settarefas(listatarefa);
      })
    }

    loadtarefas();

  }, [])

  useEffect(() => {
    async function checkLogin(){
      onAuthStateChanged(auth, (user) => {
        if(user){
          // se tem usuario logado ele entra aqui...
          console.log(user);
          setUser(true);
          setUserDetail({
            uid: user.uid,
            email: user.email
          })

        }else{
          // nao possui nenhum user logado.
          setUser(false);
          setUserDetail({})
        }
      })
    }

    checkLogin();

  }, [])


  async function handleAdd(){
    // await setDoc(doc(db, "tarefas", "12345"), {
    //   descricao: descricao,
    //   autor: autor,
    // })
    // .then(() => {
    //   console.log("DADOS REGISTRADO NO BANCO!")
    // })
    // .catch((error) => {
    //   console.log("GEROU ERRO" + error)
    // }) 


    await addDoc(collection(db, "tarefas"), {
      descricao: descricao,
      autor: autor,
    })
    .then(() => {
      console.log("CADASTRADO COM SUCESSO")
      setAutor('');
      setdescricao('')
    })
    .catch((error) => {
      console.log("ERRO " + error)
    })


  }


  async function buscartarefa(){
    // const tarefaRef = doc(db, "tarefas", "vFvZAyFqebXFsFv0X89l")
    // await getDoc(tarefaRef)
    // .then((snapshot) => {
    //   setAutor(snapshot.data().autor)
    //   setdescricao(snapshot.data().descricao)

    // })
    // .catch(()=>{
    //   console.log("ERRO AO BUSCAR")
    // })

    const tarefasRef = collection(db, "tarefas")
    await getDocs(tarefasRef)
    .then((snapshot) => {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          descricao: doc.data().descricao,
          autor: doc.data().autor,
        })
      })

      settarefas(lista);

    })
    .catch((error) => {
      console.log("DEU ALGUM ERRO AO BUSCAR")
    })


  }


  async function editartarefa(){
    const docRef = doc(db, "tarefas", idtarefa)
    
    await updateDoc(docRef, {
      descricao: descricao,
      autor: autor
    })
    .then(() => {
      console.log("tarefa ATUALIZADO!")
      setidtarefa('')
      setdescricao('')
      setAutor('')
      alert("tarefa ATUALIZADO COM SUCESSO!")
    })
    .catch((error) => {
      console.log(error)
    })


  }


  async function excluirtarefa(id){
    const docRef = doc(db, "tarefas", id)
    await deleteDoc(docRef)
    .then(() =>{
      alert("tarefa DELETADO COM SUCESSO!")
    })

  }

  async function novoUsuario(){
    await createUserWithEmailAndPassword(auth, email, senha)
    .then(() => {
      console.log("CADASTRADO COM SUCESSO!")
    
      setEmail('')
      setSenha('')
    })
    .catch((error) => {
      
      if(error.code === 'auth/weak-password'){
        alert("Senha muito fraca.")
      }else if(error.code === 'auth/email-already-in-use'){
        alert("Email já existe!")
      }

    })
  }

  async function logarUsuario(){
    await signInWithEmailAndPassword(auth, email, senha)
    .then((value) => {
      console.log("USER LOGADO COM SUCESSO")
      console.log(value.user);

      setUserDetail({
        uid: value.user.uid,
        email: value.user.email,
      })
      setUser(true);

      setEmail('')
      setSenha('')
    })
    .catch(() => {
      console.log("ERRO AO FAZER O LOGIN")
    })
  }


  async function fazerLogout(){
    await signOut(auth)
    setUser(false);
    setUserDetail({})
  }

  return (
    <div>
      <h1>Lista de tarefas</h1>

      { user && (
        <div>
          <strong>Seja bem-vindo(a) (Você está logado!)</strong> <br/>
          <span>ID: {userDetail.uid} - Email: {userDetail.email}</span> <br/>
          <button onClick={fazerLogout}>Sair da conta</button>
          <br/> <br/>
        </div>
      )}

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

    <br/><br/>
    <hr/>


    <div className="container">
      <h2>LISTA</h2>

      <label>Número da tarefa:</label>
      <input
        placeholder='Digite o Número da tarefa'
        value={idtarefa}
        onChange={ (e) => setidtarefa(e.target.value) }
      /> <br/>

      <label>descricao:</label>
      <textarea 
        type="text"
        placeholder='Digite o descricao'
        value={descricao}
        onChange={ (e) => setdescricao(e.target.value) }
      />

      <label>Autor:</label>
      <input 
        type="text" 
        placeholder="Autor da Terefa"
        value={autor}
        onChange={(e) => setAutor(e.target.value) }
      />

      <button onClick={handleAdd}>Cadastrar</button>
      <button onClick={buscartarefa}>Buscar tarefa</button> <br/>

      <button onClick={editartarefa}>Atualizar tarefa</button>


      <ul>
        {tarefas.map( (tarefa) => {
          return(
            <li key={tarefa.id}>
              <strong>ID: {tarefa.id}</strong> <br/>
              <span>descricao: {tarefa.descricao} </span> <br/>
              <span>Autor: {tarefa.autor}</span> <br/> 
              <button onClick={ () => excluirtarefa(tarefa.id) }>Excluir</button> <br/> <br/>
            </li>
          )
        })}
      </ul>

    </div>

    </div>
  );
}

export default App;