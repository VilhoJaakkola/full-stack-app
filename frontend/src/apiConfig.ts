// apiConfig.js
const baseURL = 'http://localhost:5000/api';

const endpoints = {
    driver: `${baseURL}/driver`,
    vehicle: `${baseURL}/vehicle`,
    user: `${baseURL}/user`,
    company: `${baseURL}/company`,
    journey: `${baseURL}/journey`
    // lisää muut tarvittavat endpointit
};

export default endpoints;