import { useState } from 'react';

export const Dropdown = ({ title, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const handleSelection = (option) => {
        setSelectedPokemon(option);
        setIsOpen(false);
    };

    return (
        <div className="c-dropdown">
            <div
                data-testid="selected-item-section"
            >
                {selectedPokemon}
            </div>

            <button
                data-testid="button-select-item"
                onClick={() => setIsOpen(!isOpen)}>
                {title}
            </button>

            {isOpen && (
                <ul>
                    {options.map(option =>
                        <li
                            key={option}
                            role="menuitem"
                            onClick={() => handleSelection('Seu Pokemon: ' + option)}>
                            {option}
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
}