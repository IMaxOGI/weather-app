import React from 'react';
import { render, screen } from '@testing-library/react';
import CityDetail from './index';

test('should display city name and weather description', () => {
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
            feels_like: 18,
            temp_min: 15,
            temp_max: 25,
            pressure: 1015,
            humidity: 70,
        },
        wind: {
            speed: 5,
            deg: 180,
        },
        clouds: {
            all: 80,
        },
    };

    // render(<CityDetail city={city} />);

    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Weather: Cloudy')).toBeInTheDocument();
});
