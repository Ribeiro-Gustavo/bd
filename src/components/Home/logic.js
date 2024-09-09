import { useState, useEffect } from 'react';
import { db, auth } from '../../firebaseConnection';
import { 
  doc, collection, addDoc, getDocs, updateDoc, deleteDoc, onSnapshot 
} from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged 
} from 'firebase/auth';

// Custom hook que começa com 'use'
export function useAppLogic() {
  const [descricao, setDescricao] = useState('');
  const [autor, setAutor] = useState('');
  const [idtarefa, setIdTarefa] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [user, setUser] = useState(null);
  const [userDetail, setUserDetail] = useState({});
  const [tarefas, setTarefas] = useState([]);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

  // Efeito para escutar mudanças na coleção de tarefas
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tarefas"), (snapshot) => {
      let listaTarefa = [];
      snapshot.forEach((doc) => {
        listaTarefa.push({
          id: doc.id,
          descricao: doc.data().descricao,
          autor: doc.data().autor,
        });
      });
      setTarefas(listaTarefa);
    });

    return () => unsub();
  }, []);

  // Efeito para verificar o estado de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserDetail({
          uid: user.uid,
          email: user.email
        });
      } else {
        setUser(null);
        setUserDetail({});
      }
    });

    return () => unsubscribe();
  }, []);

  // Função para adicionar uma nova tarefa
  const handleAdd = async () => {
    try {
      await addDoc(collection(db, "tarefas"), { descricao, autor });
      setAutor('');
      setDescricao('');
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  };

  // Função para buscar tarefas
  const buscarTarefa = async () => {
    try {
      const tarefasRef = collection(db, "tarefas");
      const snapshot = await getDocs(tarefasRef);
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          descricao: doc.data().descricao,
          autor: doc.data().autor,
        });
      });

      setTarefas(lista);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  // Função para editar uma tarefa
  const editarTarefa = async () => {
    try {
      const docRef = doc(db, "tarefas", idtarefa);
      await updateDoc(docRef, { descricao, autor });
      alert("Tarefa atualizada com sucesso!");
      setIdTarefa('');
      setDescricao('');
      setAutor('');
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  // Função para excluir uma tarefa
  const excluirTarefa = async (id) => {
    try {
      const docRef = doc(db, "tarefas", id);
      await deleteDoc(docRef);
      alert("Tarefa deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  // Função para criar um novo usuário
  const novoUsuario = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      setEmail('');
      setSenha('');
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        alert("Senha muito fraca.");
      } else if (error.code === 'auth/email-already-in-use') {
        alert("Email já existe!");
      }
    }
  };

  // Função para logar um usuário
  const logarUsuario = async () => {
    try {
      const value = await signInWithEmailAndPassword(auth, email, senha);
      setUserDetail({ uid: value.user.uid, email: value.user.email });
      setUser(value.user);
      setEmail('');
      setSenha('');
    } catch {
      console.error("Erro ao fazer login.");
    }
  };

  // Função para fazer logout
  const fazerLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserDetail({});
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return {
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
    fazerLogout,
    showWelcomeMessage
  };
}
