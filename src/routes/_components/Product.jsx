import PropTypes from 'prop-types';

export default function Product({ image, title }) {
  return (
    <div className="flex flex-col gap-4 lg:gap-8">
      <div className="flex flex-1 items-center justify-center rounded-3xl bg-white py-4 shadow-2xl">
        <img
          src={image}
          alt={title}
          className="max-h-[50vh] w-[80%] rounded-3xl"
          loading="lazy"
        />
      </div>
      <p className="overflow-hidden text-ellipsis text-nowrap px-4 text-center text-sm font-medium text-gray-500 md:text-base dark:text-gray-300">
        {title}
      </p>
    </div>
  );
}

Product.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string
};
