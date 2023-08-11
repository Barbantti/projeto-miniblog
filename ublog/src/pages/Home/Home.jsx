// CSS
import styles from './Home.module.css';

// Hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from 'react';
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

// Components
import PostDetail from '../../components/PostDetail/PostDetail';

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocuments("posts");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className={styles.home}>
      <h1>See our most recent posts</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          placeholder='To look for'
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Search</button>
      </form>
      <div>
        {loading && <p>Loading...</p>}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
        {posts && posts.length === 0 && (
          <div className={styles.no_posts}>
            <p>No posts found!</p>
            <Link to="/post/create" className='btn'>Make a new post</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;