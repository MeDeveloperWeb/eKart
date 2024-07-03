import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCategoryProducts } from '../_lib/products';
import { Link } from 'react-router-dom';

export default function CategoryProduct({ category }) {
  const [products, setProducts] = useState([]);

  const limit = 4;

  useEffect(() => {
    async function fetchCategory() {
      const data = await getCategoryProducts(category.toLowerCase(), limit);

      setProducts(data);
    }
    fetchCategory();
  }, [category]);

  return (
    <div className="mx-auto my-0 space-y-8 p-8">
      <div className="flex justify-between border-b-2 border-solid px-1">
        <h3 className=" font-heading text-xl font-semibold">{category}</h3>
        <Link className="text-blue-500">Browse more...</Link>
      </div>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map(({ id, title, image }) => (
          <div key={id} className="flex flex-col gap-4 lg:gap-8">
            <div className="flex flex-1 items-center justify-center rounded-3xl bg-white py-4 shadow-2xl">
              <img
                src={image}
                alt="title"
                className="max-h-[50vh] w-[80%] rounded-3xl"
              />
            </div>
            <p className="overflow-hidden text-ellipsis text-nowrap px-4 text-center text-sm font-medium text-gray-500 md:text-base dark:text-gray-300">
              {title}
            </p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}

CategoryProduct.propTypes = {
  category: PropTypes.string
};
