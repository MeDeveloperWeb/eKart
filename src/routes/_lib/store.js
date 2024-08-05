import { storeGET } from './api';

export async function getCategoryProducts(category, limit = 10, offset = 0) {
  return await storeGET(
    `products/category/${category}/?limit=${limit}&offset=${offset}`
  );
}

export default async function getCategories() {
  return await storeGET('products/categories');
}
