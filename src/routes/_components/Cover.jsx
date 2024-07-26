import model1 from '../../assets/cover/cover.png';
import PropTypes from 'prop-types';

export default function Cover() {
  const BigCoverText = ({ className, ...props }) => (
    <>
      {/*for xl and bigger */}
      <div
        className={`absolute my-10 hidden h-screen w-full grid-cols-2 grid-rows-2 font-heading text-[20vw] *:py-4 xl:grid ${className}`}
        {...props}
      >
        <span className="self-end">Find</span>{' '}
        <span className="self-end justify-self-end">Your</span>
        <span>True</span>
        <span className="justify-self-end">Style</span>
      </div>
    </>
  );

  BigCoverText.propTypes = {
    className: PropTypes.string
  };

  const SmallCoverText = () => (
    <div className="flex h-full w-full flex-col items-center justify-center bg-yellow-950 text-center text-bisque">
      {/* <div className="flex-1 text-5xl font-extrabold">Trending Styles</div> */}
      <div className="flex flex-wrap items-center justify-center text-6xl sm:text-9xl md:text-7xl lg:text-8xl">
        <span>Find your&nbsp;</span>
        <span>own style</span>
      </div>
    </div>
  );

  return (
    <div
      className="-mt-[4.25rem] flex w-full justify-center overflow-hidden bg-bisque dark:bg-[#562f00]"
      data-testid="main-cover"
    >
      <BigCoverText className="-z-7 text-[#562f00] dark:text-[#d1cdc7]" />
      <div className="flex min-h-screen w-full flex-col justify-between pt-24  lg:pt-0">
        <div className="relative mx-auto my-0 max-h-[80vh] flex-1 xl:max-h-screen">
          <img
            src={model1}
            alt="Cover photo 2"
            className="mx-auto my-0 h-full w-auto object-cover"
          />
        </div>

        <div className="flex-1 xl:hidden">
          <SmallCoverText />
        </div>
      </div>

      <BigCoverText
        className="-z-1 outlined-text stroke-1 text-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
