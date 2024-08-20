import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCategoryProducts } from '../_lib/store';
import { Link } from 'react-router-dom';
import Product from './Product';

export default function CategoryProduct({ category }) {
  const [products, setProducts] = useState([]);

  const limit = 4;

  useEffect(() => {
    async function fetchCategory() {
      const data = await getCategoryProducts(category.toLowerCase(), { limit });

      setProducts(data);
    }
    fetchCategory();
  }, [category]);

  return (
    <div className="mx-auto my-0 space-y-8 p-8">
      <div className="flex justify-between border-b-2 border-solid px-1">
        <h3 className=" font-heading text-xl font-semibold">{category}</h3>
        <Link
          className="text-blue-500"
          to={`/store?category=${category.toLowerCase()}`}
        >
          Browse more...
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map(({ id, title, image }) => (
          <Product key={id} title={title} image={image} id={id} />
        ))}
      </div>
      <hr />
    </div>
  );
}

CategoryProduct.propTypes = {
  category: PropTypes.string
};
