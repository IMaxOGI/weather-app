import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../services/store';
import '@testing-library/jest-dom/extend-expect';
import CityList from './index';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
}));

jest.mock('../../services/fetchInitialCities');

describe('CityList component', () => {
    const mockCities = [
        {
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
        },
        {
            id: 2,
            name: 'London',
            weather: [{
                main: 'Rain',
                description: 'light rain',
                icon: '10d'
            }],
            main: {
                temp: 281.15,
                temp_min: 280.71,
                temp_max: 281.82
            },
            timezone: 3600
        }
    ];

    beforeEach(() => {
        (useSelector as jest.Mock).mockReturnValue(mockCities);
    });

    test('renders AddCity component', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <CityList />
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByLabelText(/Add City/i)).toBeInTheDocument();
    });

    test('renders CityCard components for each city', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <CityList />
                </BrowserRouter>
            </Provider>
        );
        mockCities.forEach(city => {
            expect(screen.getByText(new RegExp(city.name, 'i'))).toBeInTheDocument();
        });
    });
});
