import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

const CityDetail = () => {
    let { city } = useParams();

    // Сюда будет добавлен код для получения и отображения деталей погоды
    return (
        <Card sx={{ minWidth: 275, marginTop: 2 }}>
            <CardContent>
                <Typography variant="h5">{city}</Typography>
                {/* Добавьте детали погоды здесь */}
            </CardContent>
        </Card>
    );
};

export default CityDetail;
