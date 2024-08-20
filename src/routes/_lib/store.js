import { storeGET } from './api';

export function getCategoryProducts(category, params) {
  return storeGET(`products/category/${category}/`, {
    ...params
  });
}

export function getCategories() {
  return storeGET('products/categories/');
}

export function getProducts(params) {
  return storeGET('products/', params);
}

export function getProductDetails(id, params) {
  return storeGET(`products/${id}`, params);
}
