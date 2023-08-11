import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const navigate = useNavigate();

  const { insertDocument, response, dispatch } = useInsertDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clean last error message
    setFormError("");

    dispatch({ type: "LOADING" });

    // Validating image URL
    try {
      new URL(image);
    } catch (error) {
      setFormError("Image must be a URL.");

      // return button to "Publish" mode
      dispatch({
        type: "INSERTED_DOC",
      });

      return;
    }

    // create tags array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // check values
    if (!title || !image || !tags || !body) {
      // return button to "Publish" mode
      dispatch({
        type: "INSERTED_DOC",
      });

      console.log("Form has errors, not redirecting");
    } else {
      // Insert the document into the database
      insertDocument({
        title,
        image,
        body,
        tags: tagsArray,
        uid: user.uid,
        createdBy: user.displayName,
      }).then(() => {
        // Clean form if everything is correct and send to db
        setTitle("");
        setImage("");
        setBody("");
        setTags("");

        // return button to "Publish" mode
        dispatch({
          type: "INSERTED_DOC",
        });

        // Redirect to home page
        navigate("/");
      });
    }
  };

  return (
    <div className={styles.create_post}>
      <h2>Create Post</h2>
      <p>Write about whatever you want and share your knowledge!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input
            type="text"
            name="text"
            required
            placeholder="Insert your title"
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
            placeholder="Insert your image"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          <span>Content:</span>
          <textarea
            className={styles.content_box_size}
            name="body"
            required
            placeholder="About what you want to talk?"
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
        {!response.loading && <button className="btn">Publish</button>}
        {response.loading && (
          <button className="btn" disabled>
            Wait
          </button>
        )}
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
