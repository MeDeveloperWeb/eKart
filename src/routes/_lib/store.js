import { storeGET } from './api';

export async function getCategoryProducts(category, params) {
  return await storeGET(`products/category/${category}/`, {
    ...params
  });
}

export async function getCategories() {
  return await storeGET('products/categories/');
}

export async function getProducts(params) {
  return await storeGET('products/', params);
}
