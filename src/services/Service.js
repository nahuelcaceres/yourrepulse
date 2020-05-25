import axios from 'axios';

const baseURL = 'https://jsonplaceholder.typicode.com/';

//TIP: como la propiedad a exportar se llama igual que la constante..no es necesario poner key: value
export default axios.create({
    baseURL,
});