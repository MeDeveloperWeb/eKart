import { useEffect, useRef, useState } from 'react';
import { categories } from '../_lib/categories';
import CategoryProduct from './CategoryProductsPreview';

export default function Categories() {
  return (
    <div id="categories" className="font-display">
      <div className="mx-4 my-2 flex items-center">
        <h1 className="flex-1 font-heading text-3xl font-bold">Categories</h1>
        <a href="" className="text-blue-500">
          Browse all Products
        </a>
      </div>
      <Poster />
    </div>
  );
}

function Poster() {
  const scrollRef = useRef(null);

  const [posterWidth, setPosterWidth] = useState(0);

  const setWidth = () => {
    setPosterWidth(scrollRef?.current?.getBoundingClientRect().width || 0);
  };

  useEffect(() => {
    // First time call
    setWidth();
    // getBoundingClient can be expensive when used on scroll
    // Hence initializing its value after widow resize
    window.addEventListener('resize', setWidth, true);

    return () => window.removeEventListener('resize', setWidth, true);
  }, []);

  const [scrollPos, setScrollPos] = useState('left');

  const handelScrollButton = (direction) => {
    direction === 'left'
      ? (scrollRef.current.scrollLeft -= posterWidth)
      : (scrollRef.current.scrollLeft += posterWidth);
  };

  return (
    <>
      <div className="relative">
        {/* Scroll Buttons */}

        <div className="absolute left-0 top-[50%] z-10 p-8">
          <div
            className={`size-[4vw] max-h-[40px] max-w-[40px] rotate-45  cursor-pointer border-b-4 border-l-4 border-solid border-bisque lg:border-b-8 lg:border-l-8 ${scrollPos === 'left' ? 'hidden' : ''}`}
            onClick={() => handelScrollButton('left')}
          ></div>
        </div>
        <div className="absolute right-0 top-[50%] z-10 p-8">
          <div
            className={`size-[4vw] max-h-[40px] max-w-[40px] rotate-45 cursor-pointer border-r-4 border-t-4 border-solid border-bisque lg:border-r-8 lg:border-t-8 ${scrollPos === 'right' ? 'hidden' : ''}`}
            onClick={() => handelScrollButton('right')}
          ></div>
        </div>

        <div
          className="snap-x snap-mandatory overflow-y-hidden scroll-smooth"
          ref={scrollRef}
          onScrollCapture={({ target }) => {
            if (target.scrollLeft % posterWidth !== 0) return;

            if (target.scrollLeft === 0) setScrollPos('left');
            else if (
              target.scrollLeft ===
              posterWidth * (categories.length - 1)
            )
              setScrollPos('right');
            else setScrollPos('between');
          }}
        >
          <div className="flex w-[300%] *:snap-end" dir="ltr">
            {categories.map(({ title, img }, i) => (
              <div
                key={i}
                className="max-h-[80vh] w-full"
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100% auto'
                }}
              >
                <img src={img} alt={title} className="w-full opacity-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {categories.map(({ title }) => (
        <CategoryProduct key={title} category={title} />
      ))}
    </>
  );
}
