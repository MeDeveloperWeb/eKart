import { searchObject } from './utils';
import { getProducts as fetchProducts, getCategoryProducts } from './store';

export async function getProducts(filter = {}) {
  if (filter.category) {
    const products = await getCategoryProducts(filter.category, {
      sort: filter.sort?.substring(0, 4) || ''
    });

    return products;
  }

  const products = await fetchProducts({
    sort: filter.sort?.substring(0, 4) || ''
  });

  if (filter.search) {
    return searchObject(
      products,
      ['title', 'description', 'category'],
      filter.search
    );
  }

  return products;
}
