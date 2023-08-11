// CSS
import styles from "./PostDetail.module.css";

// Eslint validation
import PropTypes from "prop-types";
import postPropTypes from "./PropTypes";

import { Link } from "react-router-dom";

const PostDetail = ({ post }) => {
  return (
    <div className={styles.post_detail}>
      <p className={styles.created_by_first}>{post.createdBy}</p>
      <img src={post.image} alt={post.title} />
      <div className={styles.paragraph_and_h2}>
        <p className={styles.created_by}>{post.createdBy}</p>
        <h2>{post.title}</h2>
      </div>
      <div className={styles.tags}>
        {post.tags.map((tag) => (
          <p key={tag}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      <Link to={`/posts/${post.id}`} className="btn btn-outline">
        more
      </Link>
    </div>
  );
};

PostDetail.propTypes = {
  post: PropTypes.shape(postPropTypes).isRequired,
};

export default PostDetail;
