// CSS
import styles from "./EditPost.module.css";

// Component
import Modal from "../../components/Modal/Modal";

// Hooks
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const EditPost = () => {
  // Requesting URL to get id
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  // Defining states
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const navigate = useNavigate();

  // Open modal after edit form successfully
  // Ask user if want edit another form
  const handleEditAnother = () => {
    closeModal();
    navigate("/dashboard");
  };

  //  Ask user if want go to home page
  const handleGoHome = () => {
    closeModal();
    navigate("/");
  };

  useEffect(() => {
    // Updating states values
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);

      // Converting tags [Array] in a "string" to update state value and removing any space " " or comma "," with join()
      const textTags = post.tags.join(",");

      setTags(textTags);
    }
  }, [post]);

  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // Validate URL image

    try {
      new URL(image);
    } catch (error) {
      setFormError("Image must be a URL.");
    }

    // Create tags array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // Check all data value
    if (!title || !image || !tags || !body) {
      setFormError("Form has errors, please fill in all fields");
    }

    if (formError) return;

    const data = {
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };

    updateDocument(id, data);

    openModal();
  };

  return (
    <div className={styles.edit_post}>
      {/* Validating if post exist before edit form */}
      {post && (
        <>
          <h2>Edit post: {post.title}</h2>
          <p>Change the post data however you want</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Title:</span>
              <input
                type="text"
                name="title"
                required
                placeholder="Edit your title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label>
              <span>URL image:</span>
              <input
                type="text"
                name="image"
                required
                placeholder="Change your image"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <p className={styles.preview_title}>Actual image preview:</p>
            <img
              className={styles.image_preview}
              src={post.image}
              alt={post.title}
            />
            <label>
              <span>Content:</span>
              <textarea
                className={styles.content_box_size}
                name="body"
                placeholder="Edit your text"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
            </label>
            <label>
              <span>Tags:</span>
              <input
                type="text"
                name="tags"
                required
                placeholder="Enter your tags separated by comma"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>
            {!response.loading && <button className="btn">Update</button>}
            {response.loading && (
              <button className="btn" disabled>
                Wait
              </button>
            )}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
          {/* Render modal */}

          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            onEditAnother={handleEditAnother}
            onGoHome={handleGoHome}
          />
        </>
      )}
    </div>
  );
};

export default EditPost;
