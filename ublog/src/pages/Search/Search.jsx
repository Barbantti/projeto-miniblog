// CSS
import styles from './Search.module.css';

// Hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';

// Components
import PostDetail from '../../components/PostDetail/PostDetail';
import { Link } from 'react-router-dom';

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <div className={styles.search_container}>
      <h1>Results found for: <span className={styles.result}>&quot;{search}&quot;</span></h1>
      <div>
        {posts && posts.length === 0 && (
          <div className={styles.no_posts}>
          <p>No posts were found for your search</p>
          <div className={styles.return_btn}>
          <Link to="/" className='btn btn-dark' >
          Return to home
          </Link>
          </div>
          </div>
        )}
        {posts && posts.map((post) =>
          <PostDetail key={post.id} post={post} />
        )}
      </div>
    </div>
  )
}

export default Search