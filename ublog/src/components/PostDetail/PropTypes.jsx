// Eslint Validations
import PropTypes from 'prop-types';

// PostDetail

const postPropTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  createdBy: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default postPropTypes;