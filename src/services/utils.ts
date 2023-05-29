export const kelvinToCelsius = (temp: number) => {
    return temp - 273.15;
};

export const formatLocalTime = (timezone: number): string => {
    const localTime = new Date(new Date().getTime() + timezone * 1000);
    return localTime.toISOString().split('T')[1].substring(0, 5);
};

