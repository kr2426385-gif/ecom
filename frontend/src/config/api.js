const DEFAULT_LOCAL_API_URL = 'http://localhost:5000';

export const getApiBaseUrl = () => {
  const configuredUrl = process.env.REACT_APP_API_URL;

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, '');
  }

  if (process.env.NODE_ENV === 'development') {
    return DEFAULT_LOCAL_API_URL;
  }

  return '';
};

export const apiUrl = (path) => `${getApiBaseUrl()}${path}`;
