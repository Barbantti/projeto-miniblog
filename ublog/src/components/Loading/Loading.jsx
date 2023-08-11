// CSS
import styles from './Loading.module.css';
import PropTypes from "prop-types";



const Loading = () => {
  return (

    <div className={styles.spinnercontanier}>
      <div className={styles.loadingspinner}>
      </div>
    </div>
  );
};

Loading.propTypes = {
  loadingText: PropTypes.node.isRequired
};

export default Loading;