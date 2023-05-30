import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../../services/store';
import '@testing-library/jest-dom/extend-expect';
import AddCity from './index';

describe('AddCity Component', () => {
    test('renders input and button', () => {
        render(
            <Provider store={store}>
                <AddCity />
            </Provider>
        );

        const input = screen.getByLabelText(/Add City/i);
        const button = screen.getByRole('button', { name: /Add/i });

        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    test('allows input to be typed into the text field', () => {
        render(
            <Provider store={store}>
                <AddCity />
            </Provider>
        );

        const input = screen.getByLabelText(/Add City/i) as HTMLInputElement;
        userEvent.type(input, 'Kyiv');
        expect(input.value).toBe('Kyiv');
    });

    test('clears the text field when the add button is clicked', async () => {
        render(
            <Provider store={store}>
                <AddCity />
            </Provider>
        );

        const input = screen.getByLabelText(/Add City/i) as HTMLInputElement;
        const button = screen.getByRole('button', { name: /Add/i });

        userEvent.type(input, 'Kyiv');
        userEvent.click(button);
        await waitFor(() => expect(input.value).toBe(''));
    });
});
