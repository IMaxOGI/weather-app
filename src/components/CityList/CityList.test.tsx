import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import CityList from './index';

// Create a mock Redux store for testing
const mockStore = createStore(() => ({
    city: {
        cities: [
            {
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
            },
            // Add more mock cities as needed
        ],
    },
}));

test('should render list of cities', () => {
    render(
        <Provider store={mockStore}>
            <CityList />
        </Provider>
    );

    expect(screen.getByText('London')).toBeInTheDocument();
});
