import { useState, useEffect, useRef } from 'react';

export const PokemonList = () => {
    const [list, setList] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const shouldRequest = useRef(true);

    const fetchPokemons = async () => {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
            .catch((error) => console.log("Erro ao carregar Pokemons: ", error));
        const data = await response.json();
        return data.results;
    }

    function handleSelectedPokemon(pokemonName) {
        return pokemonName + " teste";
    }

    useEffect(() => {
        if (shouldRequest.current) {
            shouldRequest.current = false;

            (async () => {
                const data = await fetchPokemons();
                setList(data);
            })();
        }
    }, []);

    return (
        <div>
            {selectedPokemon && (
                <div data-testid='selected-pokemon'>
                    {selectedPokemon}
                </div>
            )}
            <ul data-testid="pokemon-list">
                {list?.map((pokemon, index) =>
                    <li
                        key={pokemon.name}
                        role="menuitem"
                        onClick={() => setSelectedPokemon(handleSelectedPokemon(pokemon.name))}
                        data-testid={`pokemon-id-${index}`}>
                        {pokemon.name}
                    </li>
                )}
            </ul>
        </div>
    );
}