export const get = async (url) => {
  const response = await fetch(url);
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
  const response = await fetch(url, {
    method: 'PUT',
    body: body,
  });
  const data = await response.json();
  return data;
}