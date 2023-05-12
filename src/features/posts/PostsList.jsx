import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPosts,
} from "./postsSlice";
import "./posts.css";
import PostExcerpt from "./PostExcerpt";

const PostsList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  let content;
  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === "succeeded") {
    //the orderedPosts function sorts out the posts by comparing their dates. This function takes in a slice() method that helps in creating a shallow copy of the array of the original posts. We can now pass this orderedPosts as posts in our renderedPosts function
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => {
      const { id } = post;
      return <PostExcerpt key={id} post={post} />;
    });
  } else if (postsStatus === "failed") {
    content = <p>{postsError}</p>;
  }

  return <section className="post-list">{content}</section>;
};

export default PostsList;
