import React, {useState, useEffect } from 'react';
import api from './services/api';

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

function App() {
  const [devs, setDevs] = useState([]); // Declarando um array vazio
  
  useEffect(() => {
    async function loadDevs() { // Declara uma funcao para carregar os devs
      const response = await api.get('/devs');
      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]); // Cria um array com o valor de devs e adiciona recem cadastrado
  }

  async function handleDelDev(dev) {
    await api.delete(`/devs?github_username=${dev.github_username}`);
    
    setDevs([...devs.filter(item => item.github_username !== dev.github_username)]);
  }

  async function handleAlterDev(dev) {
    document.getElementById("github_username").value = dev.github_username;
    document.getElementById("techs").value = dev.techs;
    document.getElementById("latitude").value = dev.location.coordinates[0];
    document.getElementById("longitude").value = dev.location.coordinates[1];
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} del={handleDelDev} alter={handleAlterDev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
