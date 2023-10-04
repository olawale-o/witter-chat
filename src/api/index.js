const BASEU_URL = process.env.NODE_ENV !== 'development' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL
export const get = async (url) => {
  const response = await fetch(`${BASEU_URL}${url}`);
  return await response.json();
};

export const post = async (url, body) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

export const put = async (url, body) => {
  const response = await fetch(`${BASEU_URL}${url}`, {
    method: 'PUT',
    body: body,
  });
  const data = await response.json();
  return data;
}