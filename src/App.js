import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dropdown } from './components/dropdown/dropdown';
import { PokemonList } from './components/listPokemons/listPokemons';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Dropdown
              title="Selecione seu pokemon inicial"
              options={['Bulbassaur', 'Charmander', 'Squirtle']} />
          </Route>
          <Route path="/pokemonList" exact>
            <PokemonList />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
