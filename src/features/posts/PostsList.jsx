import React from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import "./posts.css";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);

  //the orderedPosts function sorts out the posts by comparing their dates. This function takes in a slice() method that helps in creating a shallow copy of the array of the original posts. We can now pass this orderedPosts as posts in our renderedPosts function
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => {
    const { id, title, content } = post;
    return (
      <article key={id}>
        <h3>{title}</h3>
        <p>{content.substring(0, 100)}</p>
        <p className="postCredit">
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButton post={post} />
      </article>
    );
  });

  return (
    <section className="post-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostsList;
