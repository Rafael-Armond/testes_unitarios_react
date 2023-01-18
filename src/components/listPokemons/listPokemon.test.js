import nock from 'nock';
import { screen, render, userEvent, waitFor } from '../../setupTests';
import { PokemonList } from './listPokemons';

const requestMock = {
    "results": [
        {
            "name": "Rafael"
        },
        {
            "name": "Luca"
        },
        {
            "name": "José"
        },
        {
            "name": "Bruno"
        },
        {
            "name": "Ilg"
        }
    ]
};

describe('Testes de componente assíncrono', () => {
    it('Deve estar vazia a lista de pokemons (anterior a chamada de API)', () => {
        const { getByTestId } = render(<PokemonList />);

        const pokemonsList = getByTestId('pokemon-list');

        expect(pokemonsList).toBeEmptyDOMElement();
        expect(screen.queryByText('Bulbassaur')).not.toBeInTheDocument();
    });

    it('Deve estar preenchida a lista de pokemons (posterior a chamada de API)', async () => {
        render(<PokemonList />);

        const liPokemon = await waitFor(() => screen.findByTestId('pokemon-id-0'));

        expect(liPokemon).toBeInTheDocument(); 
        expect(liPokemon).toHaveTextContent('bulbasaur');
    });

    it('Mockando a lista renderizada (mockando chamada de api)', async () => {
        nock('https://pokeapi.co/api/v2')
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
            })
            .get('/pokemon?limit=151')
            .reply(200, requestMock);

        render(<PokemonList />);

        const liPokemon = await waitFor(async () => screen.findByTestId('pokemon-id-0'));

        expect(liPokemon).toBeInTheDocument();
        expect(liPokemon).toHaveTextContent('Rafael');
    });

    it('Teste de clique em elemento da tela', async () => {
        nock('https://pokeapi.co/api/v2')
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
            })
            .get('/pokemon?limit=151')
            .reply(200, requestMock);

        render(<PokemonList />);

        const liPokemon = await waitFor(async () => screen.getByText('Rafael'));
        userEvent.click(liPokemon);

        const selectedPokemonDiv = screen.getByTestId('selected-pokemon');

        expect(liPokemon).toBeInTheDocument();
        expect(liPokemon).toHaveTextContent('Rafael');
        expect(selectedPokemonDiv).toHaveTextContent('Rafael teste');
    });
});

describe('Uma forma alternativa de fazer as mesmas coisas do outro teste, usando SpyOn', () => {
    const requestMock = {
        "results": [
            {
                "name": "Rafael"
            },
            {
                "name": "Luca"
            },
            {
                "name": "José"
            },
            {
                "name": "Bruno"
            },
            {
                "name": "Ilg"
            }
        ]
    };

    beforeEach(() => {
        /* Cria uma função simulada semelhante a jest.fn, mas também rastreia chamadas. 
           Retorna uma função simulada do Jest. */
        jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve(requestMock)
        }));
    })

    afterEach(() => {
        // Restores all mocks back to their original value
        jest.restoreAllMocks();
    });

    it('Teste com Jest.SpyOn', async () => {
        render(<PokemonList />);

        const liPokemon = await waitFor(async () => screen.findByText('Rafael'));
        userEvent.click(liPokemon);

        const selectedPokemonDiv = screen.getByTestId('selected-pokemon');

        expect(liPokemon).toBeInTheDocument();
        expect(liPokemon).toHaveTextContent('Rafael');
        expect(selectedPokemonDiv).toHaveTextContent('Rafael teste');
    });
});