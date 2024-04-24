import "./App.css";
import { Card } from "./components/Card";
import { CreateUser } from "./components/CreateUser";
import { useState } from "react";

export default function App() {
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

  const [users, setUsers] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("data")) || [];
    return storedData;
  });

  const updateCreatedUsers = (newUser) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("data", JSON.stringify(updatedUsers));
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    setUsers([]);
  };

  return (
    <>
      <header>
        <h1>Cadastrar Aluno</h1>
        <div className="btnActions">
          <button onClick={() => setIsCreateUserOpen(!isCreateUserOpen)}>
            Criar usuário
          </button>
          <button className="btnCancel" onClick={clearLocalStorage}>Deletar Todos os Usuários</button>
        </div>
      </header>

      {isCreateUserOpen && (
        <CreateUser
          cancelCreateUser={() => setIsCreateUserOpen(!isCreateUserOpen)}
          updateCreatedUsers={updateCreatedUsers}
        />
      )}

      {users && (
        <div className="cardContainer">
          {users.map((item, index) => {
            return (
              <Card
                key={index}
                name={item.name}
                ra={item.ra}
                dataNasc={item.dataNasc}
                pai={item.namePai}
                mae={item.nameMae}
                numTel={item.numTel}
                endereco={item.endereco}
                email={item.email}
                curso={item.curso}
                periodo={item.periodo}
                nota1={item.nota1}
                nota2={item.nota2}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
