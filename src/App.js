import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositorys, setRepositorys] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositorys(response.data);
      console.log(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: "Desafio REACT -- Nivel 01",
      url: "https://github.com/NtkArt/desafio-bootcamp-03",
      techs: ["react.js", "Express"],
    });

    const repository = response.data;

    setRepositorys([...repositorys, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const updatedRepositories = repositorys.filter(
      (repository) => repository.id !== id
    );

    setRepositorys(updatedRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositorys.length > 0 ? (
          repositorys.map((repository) => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        ) : (
          <h3>Nao existem repositorios arquivados.</h3>
        )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
