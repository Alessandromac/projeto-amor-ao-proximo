/*import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:3001/api'
});

export default httpClient;  */

import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const httpClient = axios.create({
  baseURL: API_BASE_URL
});

export default httpClient;