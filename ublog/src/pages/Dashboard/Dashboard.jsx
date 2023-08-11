// CSS
import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";

// Context
import { useAuthValue } from "../../context/AuthContext";

// Hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { useState } from "react";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  // User post
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const { deleteDocument } = useDeleteDocument("posts");

  const handleDeletePost = async (postId) => {
    await deleteDocument(postId);
    setShowDeleteModal(false);
    setPostToDelete(null);
  };

  const handleShowDeleteModal = (post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Manage your posts</p>
      {/* Header form */}
      {posts && posts.length === 0 ? (
        <div className={styles.no_posts}>
          <p>Posts not found</p>
          <Link to="/post/create" className="btn">
            Create your first post
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Title</span>
            <span>Actions</span>
          </div>
          {posts &&
            posts.map((post) => (
              <div key={post.id} className={styles.post_row}>
                <p>{post.title}</p>
                <div>
                  <Link to={`/posts/${post.id}`} className="btn btn-outline">
                    See post
                  </Link>
                  <Link
                    to={`/posts/edit/${post.id}`}
                    className="btn btn-outline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleShowDeleteModal(post)}
                    className="btn btn-outline btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          {showDeleteModal && (
            <div className={styles.modalContainer}>
              <div className={styles.modalContent}>
                <h3>Confirm Delete?</h3>
                <p>
                  Are you sure you want to <span>delete</span> this post?
                </p>
                <div className={styles.btn_modal_container}>
                  <button
                    className={styles.btn_modal_cancel}
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className={styles.btn_modal_delete}
                    onClick={() => handleDeletePost(postToDelete.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
