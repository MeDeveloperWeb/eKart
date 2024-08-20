import PropTypes from 'prop-types';

export default function StarSVG({ fillPercent, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      className="feather feather-star"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      {...props}
    >
      <defs>
        <linearGradient
          id={'a' + fillPercent}
          x1="0%"
          x2="100%"
          y1="0%"
          y2="0%"
        >
          <stop
            offset={(fillPercent ?? 100) + '%'}
            style={{
              stopColor: 'currentColor',
              stopOpacity: 1
            }}
          />
          <stop
            offset={(fillPercent ?? 100) + '%'}
            style={{
              stopColor: 'transparent',
              stopOpacity: 1
            }}
          />
        </linearGradient>
      </defs>
      <path
        fill={`url(#a${fillPercent})`}
        d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      />
    </svg>
  );
}

StarSVG.propTypes = {
  fillPercent: PropTypes.number
};
