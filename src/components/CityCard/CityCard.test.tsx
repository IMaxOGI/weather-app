import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../services/store';
import '@testing-library/jest-dom/extend-expect';
import CityCard from './index';

const mockCity = {
    id: 1,
    name: 'Kyiv',
    weather: [{
        main: 'Clear',
        description: 'clear sky',
        icon: '01d'
    }],
    main: {
        temp: 289.15,
        temp_min: 288.71,
        temp_max: 289.82
    },
    timezone: 10800
};

describe('CityCard component', () => {
    test('renders city name', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <CityCard city={mockCity} />
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByText(/Kyiv/i)).toBeInTheDocument();
    });

    test('renders city weather description', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <CityCard city={mockCity} />
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByText(/clear sky/i)).toBeInTheDocument();
    });

    test('renders city min and max temperature', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <CityCard city={mockCity} />
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByText(/Min Temperature: 15.56°C/i)).toBeInTheDocument();
        expect(screen.getByText(/Max Temperature: 16.67°C/i)).toBeInTheDocument();
    });

    test('calls "removeCity" action on "Remove" button click', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <CityCard city={mockCity} />
                </BrowserRouter>
            </Provider>
        );
        const removeButton = screen.getByText(/remove/i);
        fireEvent.click(removeButton);
    });

    test('calls "updateCityWeather" action on "Update" button click', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <CityCard city={mockCity} />
                </BrowserRouter>
            </Provider>
        );
        const updateButton = screen.getByText(/update/i);
        fireEvent.click(updateButton);
    });
});
