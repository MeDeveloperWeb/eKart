import PropTypes from 'prop-types';
import StarSVG from '../../../../assets/icons/star';

export default function RatingStars({ rating, max = 5, ...props }) {
  const stars = [];

  const floor = Math.floor(rating);

  const lastPercent = Math.round((rating - floor) * 100);

  for (let i = 0; i < max; ++i) {
    stars.push(
      <StarSVG
        fillPercent={i < floor ? 100 : i === floor ? lastPercent : 0}
        key={i}
        {...props}
      />
    );
  }

  return stars;
}

RatingStars.propTypes = {
  rating: PropTypes.number,
  max: PropTypes.number
};
