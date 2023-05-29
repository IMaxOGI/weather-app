import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import store from '../../services/store';
import '@testing-library/jest-dom/extend-expect';
import CityDetail from './index';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
}));

describe('CityDetail component', () => {
    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({ city: 'Kyiv' });
    });

    test('renders "City not found" message when city is not found', () => {
        (useSelector as jest.Mock).mockReturnValueOnce(null);
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <CityDetail />
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByText(/City not found/i)).toBeInTheDocument();
    });

    test('renders city name when city is found', () => {
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
                temp_max: 289.82,
                pressure: 1013,
                humidity: 76,
                feels_like: 288.71
            },
            timezone: 10800,
            wind: {
                speed: 2.57,
                deg: 0
            },
            clouds: {
                all: 0
            },
            forecast: [
                { dt: 1622836800, main: { temp: 289.15 } },
                { dt: 1622839800, main: { temp: 289.25 } }
            ]
        };

        (useSelector as jest.Mock).mockReturnValueOnce(mockCity);
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <CityDetail />
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByText(/Kyiv/i)).toBeInTheDocument();
    });
});
