// Vamos pegar isso q vai iniciar nosso  projeto e passar todas nossas chaves secretas que pegamos do firebase
import { initializeApp } from "firebase/app";
// esse firestore serve para fazer a conexão com o banco de da
import {
  collection,
  getFirestore,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import "./style.css";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCZgsNfvp8pMykFuc0bK0trDyB887D0ve0",
  authDomain: "crud-664b6.firebaseapp.com",
  projectId: "crud-664b6",
});

function App() {
  // Primeira coisa que devemos fazer é criar uma tabela no nosso banco de dados e salvar com os dados nessa tabela

  // Agora temos que criar alguns estados para poder utilizar oq criamos no banco de dados
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // Vou criar mais um estado para armazenar os usuários
  const [users, setUsers] = useState([]);

  const db = getFirestore(firebaseApp);
  const userCollectionRef = collection(db, "users");

  async function criarUser() {
    if (!name || !email) {
      alert("preencha todos os dados");
    } else {
      const user = await addDoc(userCollectionRef, {
        name,
        email,
      });
      setName("");
      setEmail("");
      alert("dados salvos");
      console.log("TESTE", user);
    }
  }
  console.log("INPUT", { name, email });
  console.log("User", users);

  // Vou usar um useEffect ,pois a partir do momento que carregar minha aplicção eu já qquero que ela vá lá no firebase e Vê se tem algum dado salvo e sse tiver listar ele em tela

  useEffect(() => {
    // getUsers ,pois vai buscar os usuários e async ,pois vai fazer conexção com o banco de dados e isso pode ser que demore um pouco
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);

      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  async function deleteUser(id) {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  }

  return (




    <div className="centralizar">


    
      <div className="box1">
      <h1>U<span>s</span>uá<span>ri</span>oS</h1>
        <input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={criarUser}>Criar User</button>

        <ul>
          {users.map((user) => {
            return (
              <div key={user.id} className="resultado">
                {/* <li>{user.Nome}</li>
                <li>{user.Email}</li> */}
                
                <div className="tabela">
                  <div className="nomes">
                    <li>{user.name}</li>
                    <li>{user.email}</li>
                    <br></br>
                  </div>
                  <div>
                    <span className="voa">
                      
                      <span className="icon"><i class="fa-solid fa-trash"></i></span>
                      <button onClick={(e) => deleteUser(user.id)} className="btn-limpar">Limpar</button>
                    </span>
                    
                  </div>
                </div>
              </div>
            );
          })}
        </ul>
      </div>


    </div>
  );
}

export default App;
