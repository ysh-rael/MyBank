import './App.css';
import React, { useState, useEffect } from 'react';
import Aviso from './Component/Aviso';
import Banner from './Component/Banner';
import Cartao from './Component/Cartao';
import Grupo from './Component/Grupo';
import Header from './Component/Header';
import Rodape from './Component/Rodape';
import Tecnologias from './Component/Tecnologias';
import Titulo from './Component/Titulo';

console.log('window.location.hostname: ' + window.location.hostname)
// fetch(`http://${window.location.hostname}:3003/client`)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`Erro na solicitação: ${response.status}`);
//     }
//     return response.json(); // Se a resposta for JSON
//   })
//   .then((data) => {
//     // Faça algo com os dados recebidos
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error(`Erro na solicitação: ${error}`);
//   });

function App() {

  const [client, setClient] = useState("Carregando...");
  const [saller, setSaller] = useState("Carregando...");
  const [transition, setTransition] = useState("Carregando...");
  
  // Função para fazer a solicitação Fetch
  const fetchClient = async () => {
    try {
      const response = await fetch(`http://localhost:3003/client`);
      if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.status}`);
      }
      const array = await response.json();
      const result = array.map(({ fullName, value }) => {
        return <Cartao>

          <div>
            <label>Nome:</label>
            <span>{fullName}</span>
          </div>

          <div>
            <label>Saldo em conta: R$</label>
            <span>{value}</span>
          </div>
        </Cartao>
      })

      setClient(result);
    } catch (error) {
      setClient(error);
    }
  };
  // --
  const fetchSaller = async () => {
    try {
      const response = await fetch(`http://localhost:3003/saller`);
      if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.status}`);
      }
      const array = await response.json();
      const result = array.map(({ fullName, value }) => {
        return <Cartao>

          <div>
            <label>Nome:</label>
            <span>{fullName}</span>
          </div>

          <div>
            <label>Saldo em conta: R$</label>
            <span>{value}</span>
          </div>
        </Cartao>
      })

      setSaller(result);
    } catch (error) {
      setSaller(error);
    }
  };
  // --
  const fetchTransition = async () => {
    try {
      const response = await fetch(`http://localhost:3003/transition`);
      if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.status}`);
      }
      const array = await response.json();
      const result = array.map(({ details: { sender, receiver, value, Date }, status, _id }) => {
        return <Cartao>

          <div>
            <label>Id:</label>
            <span>{_id}</span>
          </div>

          <div>
            <label>Emissor:</label>
            <span>{sender}</span>
          </div>

          <div>
            <label>Remetente:</label>
            <span>{receiver}</span>
          </div>

          <div>
            <label>Valor: R$</label>
            <span>{value}</span>
          </div>

          <div>
            <label>Status:</label>
            <span>{status ? "Sucesso" : "Falhou"}</span>
          </div>

          <div>
            <label>Data:</label>
            <span>{Date}</span>
          </div>
        </Cartao>
      })

      setTransition(result);
    } catch (error) {
      setTransition(error);
    }
  };
  
  useEffect(() => {

    fetchClient()
    fetchSaller()
    fetchTransition()
    const intervalClient = setInterval(fetchClient, 30 * 1000)
    const intervalSaller = setInterval(fetchSaller, 30 * 1000)
    const intervalTransition = setInterval(fetchTransition, 30 * 60 * 1000)


    return () => {
      clearInterval(intervalClient);
      clearInterval(intervalSaller);
      clearInterval(intervalTransition);
    };
  }, []); // O array vazio [] como segundo argumento garante que o useEffect será executado apenas uma vez após a montagem inicial

  return (
    <div className="App" id='App'>
      <Header />

      <Banner />

      <Tecnologias />
      <Aviso />

      <br />
      <Titulo label="Consumidor" id="TituloConsumidor" />
      <Grupo>
        {client}
      </Grupo>

      <Titulo label="Lojista" id="TituloLojista" />
      <Grupo>
        {saller}
      </Grupo>

      <Titulo label="Transação" id="TituloTransacao" />
      <Grupo>
        {transition}
      </Grupo>


      <Rodape />

    </div>
  );
}

export default App;
