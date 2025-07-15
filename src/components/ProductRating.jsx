import PropTypes from "prop-types";

const StarIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-6 h-6 ${filled ? "text-yellow-500" : "text-gray-300"}`}
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 
         5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 
         1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 
         7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273
         -4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 
         2.082-5.005Z"
      clipRule="evenodd"
    />
  </svg>
);

StarIcon.propTypes = {
  filled: PropTypes.bool.isRequired,
};

const Rating = ({ value, totalReviews }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(<StarIcon key={i} filled={i <= value} />);
  }

  return (
    <div className="flex items-center mb-4">
      {stars}
      <span className="ml-2 text-gray-600">
        {Number(value).toFixed(1)} ({totalReviews} reviews)
      </span>
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  totalReviews: PropTypes.number.isRequired,
};

export default Rating;
