import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import CityList from './components/CityList';
import CityDetail from './components/CityDetail';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/detail/:city" element={<CityDetail />} />
                <Route path="/" element={<CityList />} />
            </Routes>
        </Router>
    );
};

export default App;
