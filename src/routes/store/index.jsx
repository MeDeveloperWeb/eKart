import { useEffect, useState } from 'react';
import Header from './_components/Header';
import Product from '../_components/Product';
import loadingSvg from '../../assets/icons/loading.svg?react';
import { getProducts } from '../_lib/storeUtil';

export default function Store() {
  const [filter, setFilter] = useState({
    category: '',
    search: '',
    sort: ''
  });

  const [products, setProducts] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      const products = await getProducts(filter);
      setProducts(products);
    }
    fetchProducts();
  }, [filter]);

  return (
    <main className="flex-1">
      <Header filter={filter} setFilter={setFilter} />
      <div className="grid grid-cols-2 gap-4 px-2 pb-16 pt-4 md:grid-cols-3 md:gap-8 md:px-4 lg:grid-cols-4">
        {!products
          ? loadingSvg()
          : products.map((product) => (
              <Product
                key={product.id}
                image={product.image}
                title={product.title}
                id={product.id}
              />
            ))}
      </div>
    </main>
  );
}
