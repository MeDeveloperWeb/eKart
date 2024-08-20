import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ErrorPage from '../../ErrorPage';
import { getProductDetails } from '../../_lib/store';
import LoadingSvg from '../../../assets/icons/loading.svg?react';
import RatingStars from './_components/RatingStars';
import { getInflatedINRPrice, getINRPrice } from './lib';
import ICart from '../../../assets/icons/shopping-cart.svg?react';

export default function ProductDescription() {
  const productId = useParams().productId;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (isNaN(+productId)) return;

    async function fetchProduct() {
      const product = await getProductDetails(productId);

      setProduct(product);
    }

    fetchProduct();
  }, [productId]);

  if (isNaN(+productId)) return <ErrorPage />;

  return (
    <div className="flex flex-1 justify-center">
      {!product ? (
        <div className="flex flex-1 items-center justify-center">
          <LoadingSvg width={60} height={60} />
        </div>
      ) : (
        <div className="flex max-w-screen-2xl flex-wrap items-center justify-center gap-16 whitespace-break-spaces break-words p-4 py-8 xl:gap-20">
          <div className="overflow-hidden rounded-xl bg-white p-8 shadow-lg">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[55vh]"
            />
          </div>
          <div className="flex flex-col gap-8 p-4">
            <h1 className="max-w-[600px] text-3xl font-semibold">
              {product.title}
            </h1>

            <div className="flex items-end gap-4">
              <div className="flex gap-2 text-amber-500">
                <RatingStars rating={product.rating.rate} />
              </div>
              <div className="flex gap-2">
                <p>{product.rating.rate} / 5.0</p>
                <p>({product.rating.count} ratings)</p>
              </div>
            </div>

            <div className="flex items-end gap-2">
              <p
                className="text-2xl font-semibold text-amber-700"
                aria-label="price"
              >
                &#8377;{getINRPrice(product.price)}
              </p>
              <p className="font-light italic leading-7 line-through">
                &#8377;{getInflatedINRPrice(product.price)}
              </p>
            </div>

            <div>
              <button className="flex items-center rounded-md bg-green-700 px-4 py-2 font-medium text-white hover:shadow-lg">
                <ICart /> Add to Cart
              </button>
            </div>

            <p className="max-w-[600px] text-lg font-light">
              {product.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
