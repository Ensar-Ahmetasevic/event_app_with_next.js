import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;

  const [comments, setComments] = useState([]);

  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      // if "showComments" is true, this means we will fetch the data in the moment when the comments are shown
      fetch("/api/comments/" + eventId)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments); // receiving array of comments, and updating our useState propreti.
          // we are going now to send our resived data, so this "comments" state could then be passed to <CommentList/>.
          // Through "items" props, -> <CommentList itmes={comments} />
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    // we recive "data= email, name, text" (commentData) from new-comment.js from onAddComment
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData), // we send "commentData" (email, name, text)
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json()) // Then, wait for "response" and parse received "data", by calling the JSON() method.
      .then((data) => console.log(data));
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
