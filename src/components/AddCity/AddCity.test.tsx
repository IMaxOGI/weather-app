import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../services/store';
import '@testing-library/jest-dom/extend-expect';
import AddCity from './index';

describe('AddCity Component', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <AddCity />
            </Provider>
        );
    });

    test('renders input and button', () => {
        const input = screen.getByLabelText(/Add City/i) as HTMLInputElement;
        const button = screen.getByRole('button', { name: /Add/i });

        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    test('allows input to be typed into the text field', () => {
        const input = screen.getByLabelText(/Add City/i) as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'Kyiv' } });
        expect(input.value).toBe('Kyiv');
    });

    test('clears the text field when the add button is clicked', () => {
        const input = screen.getByLabelText(/Add City/i) as HTMLInputElement;
        const button = screen.getByRole('button', { name: /Add/i });

        fireEvent.change(input, { target: { value: 'Kyiv' } });
        fireEvent.click(button);
        expect(input.value).toBe('');
    });
});
