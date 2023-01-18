import { screen, render, userEvent } from '../../setupTests';
import { Dropdown } from './dropdown';

const title = "Devs Comercial SPX";
const options = ['Ilg', 'Bruno', 'José', 'Luca', 'Rafael'];

describe('Componente Dropdown', () => {
    it('Deve começar fechado', () => {
        render(
            <Dropdown
                title={title}
                options={options}
            />
        );

        expect(screen.queryByText(options[0])).not.toBeInTheDocument();
        expect(screen.queryByText(options[1])).not.toBeInTheDocument();
        expect(screen.queryByText(options[2])).not.toBeInTheDocument();
        expect(screen.queryByText(options[3])).not.toBeInTheDocument();
        expect(screen.queryByText(options[4])).not.toBeInTheDocument();
    });

    it('Deve mostrar as opções quando for aberto', () => {
        const { getByText } = render(
            <Dropdown
                title={title}
                options={options}
            />
        );

        const openButton = getByText(title);
        userEvent.click(openButton);

        expect(screen.getByText(options[0])).toBeInTheDocument();
        expect(screen.getByText(options[1])).toBeInTheDocument();
        expect(screen.getByText(options[2])).toBeInTheDocument();
        expect(screen.getByText(options[3])).toBeInTheDocument();
        expect(screen.getByText(options[4])).toBeInTheDocument();
    });

    it('Deve fechar o dropdown após selecionar um item da lista', () => {
        const { getByText } = render(
            <Dropdown
                title={title}
                options={options}
            />
        );

        const openButton = getByText(title);
        userEvent.click(openButton);
        const selectedItem = getByText(options[3]);
        userEvent.click(selectedItem);

        expect(screen.queryByText(options[0])).not.toBeInTheDocument();
        expect(screen.queryByText(options[1])).not.toBeInTheDocument();
        expect(screen.queryByText(options[2])).not.toBeInTheDocument();
        expect(screen.queryByText(options[3])).not.toBeInTheDocument();
        expect(screen.queryByText(options[4])).not.toBeInTheDocument();

        expect(screen.queryByTestId('selected-item-section')).toHaveTextContent('Seu Pokemon: Luca');
    });
});