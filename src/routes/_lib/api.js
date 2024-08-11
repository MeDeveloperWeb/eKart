export async function storeGET(endpoint, params) {
  const baseURL = 'https://fakestoreapi.com/';

  try {
    const response = await fetch(
      `${baseURL}${endpoint}?${new URLSearchParams(params).toString()}`,
      {
        method: 'GET'
      }
    );

    if (!response.ok)
      return {
        error: response.statusText
      };

    const data = await response.json();

    return data;
  } catch (error) {
    return {
      error: error.message
    };
  }
}
