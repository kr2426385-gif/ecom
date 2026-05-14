const DEFAULT_LOCAL_API_URL = 'http://localhost:5000';
const DEFAULT_PRODUCTION_API_URL = 'https://ecom-l4hg.onrender.com';

export const getApiBaseUrl = () => {
  const configuredUrl = process.env.REACT_APP_API_URL;

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, '');
  }

  if (process.env.NODE_ENV === 'development') {
    return DEFAULT_LOCAL_API_URL;
  }

  return DEFAULT_PRODUCTION_API_URL;
};

export const apiUrl = (path) => `${getApiBaseUrl()}${path}`;
