import { searchObject } from './utils';
import { getProducts as fetchProducts, getCategoryProducts } from './store';

export async function getProducts(filter = {}) {
  let products;
  if (filter.category) {
    products = await getCategoryProducts(filter.category, {
      sort: filter.sort?.substring(0, 4) || ''
    });
  } else {
    products = await fetchProducts({
      sort: filter.sort?.substring(0, 4) || ''
    });
  }

  if (filter.search) {
    return searchObject(
      products,
      ['title', 'description', 'category'],
      filter.search
    );
  }

  return products;
}
