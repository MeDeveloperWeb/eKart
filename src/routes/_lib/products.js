import { storeGET } from './api';

export async function getCategoryProducts(category, limit = 10, offset = 0) {
  const products = await storeGET(
    `products/category/${category}/?limit=${limit}&offset=${offset}`
  );

  return products;
}
