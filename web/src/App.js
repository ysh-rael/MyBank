import './App.css';
import Aviso from './Component/Aviso';
import Banner from './Component/Banner';
import Header from './Component/Header';
import Rodape from './Component/Rodape';
import Tecnologias from './Component/Tecnologias';
import Titulo from './Component/Titulo';

function App() {
  return (
    <div className="App" id='App'>
      <Header />

      <Banner />

      <Tecnologias />
      <Aviso />

      <br />
      <Titulo label="Consumidor" id="TituloConsumidor" />
      <Titulo label="Lojista" id="TituloLojista" />
      <Titulo label="Transação" id="TituloTransacao" />

      <Rodape />

    </div>
  );
}

export default App;
