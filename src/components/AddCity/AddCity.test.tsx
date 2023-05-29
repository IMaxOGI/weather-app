import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AddCity from './index';

test('should add city on button click', () => {
    render(<AddCity />);
    const input = screen.getByLabelText('Add City') as HTMLInputElement;
    const addButton = screen.getByRole('button', { name: 'Add' });

    fireEvent.change(input, { target: { value: 'London' } });
    fireEvent.click(addButton);

    expect(input.value).toBe('');
});
