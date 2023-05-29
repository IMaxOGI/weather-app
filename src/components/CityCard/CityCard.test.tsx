import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CityCard from './index';

test('should call removeCity on remove button click', () => {
    const city = {
        id: 1,
        name: 'London',
        weather: [{
            main: 'Clouds',
            description: 'Cloudy',
            icon: 'cloudy-icon',
        }],
        main: {
            temp: 20,
            temp_min: 15,
            temp_max: 25,
        },
    };

    const removeCity = jest.fn();

    render(<CityCard city={city} />);
    const removeButton = screen.getByRole('button', { name: 'Remove' });

    fireEvent.click(removeButton);

    expect(removeCity).toHaveBeenCalledWith(city.id);
});
