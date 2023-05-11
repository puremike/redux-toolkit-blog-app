import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//we need to replace our postAdded to the addNewPost function
import { addNewPost } from "./postsSlice";
// import { postAdded } from "./postsSlice";
import { selectAllUsers } from "../users/userSlice";
import "./posts.css";

const AddPostForm = () => {
  //set initial states using react context that we can use for out input and text area default values
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const users = useSelector(selectAllUsers);

  //create a function that changes the title and content states in our respect input and text area element when there's a change in the both elements; basically, we update the title and contents with whatever the end users enters in the input and text area fields respectively.
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const dispatch = useDispatch();

  //this code checks the condition of all the states to be true and in the Save Post button below, it uses to disable the button if one of the state is not true
  // const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  //this checks the title, content, userId and addRequestStatus === 'idle' to be true; note that the title, content, userId are wrapped inside an array and an every(Boolean) checks the condition for all
  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  //on clicking the button with this function (which is an event for our button), it will automatically push (using the postAdded reducer function we've have created) the post (including the post id (nanoid), post title, and post content to the current posts state)

  const onSavePostClicked = () => {
    // //statement to check that title and content must be true
    // if (title && content) {
    //   //don't forget that the postAdded function takes both state and action as parameter, where the action is the new post id, title, and contents data that will be generated from the input and textarea element after clicking the submit button
    //   dispatch(postAdded(title, content, userId));
    //   //after checking the statement and running the code inside the if block, we want to set both title and content back to default (""); so that we can create a new post with it
    //   setTitle("");
    //   setContent("");
    // }

    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
      } catch (error) {
        console.error("Failed to save the post", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const usersOptions = users.map((user) => {
    const { id, name } = user;
    return (
      <option key={id} value={id}>
        {name}
      </option>
    );
  });

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author: </label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>

        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button onClick={onSavePostClicked} type="button" disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
