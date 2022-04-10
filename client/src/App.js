import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Detail from './components/Detail';
import CreatePokemon from './components/CreatePokemon';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/pokemons/:id' element={<Detail />} />
          <Route path='/create' element={<CreatePokemon />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;