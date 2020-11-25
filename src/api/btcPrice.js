import apiClient from './client';

export const getBtcPrice = () =>
    apiClient.get('https://api.coindesk.com/v1/bpi/currentprice.json');
