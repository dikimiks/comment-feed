import { comments, saveComments } from "./comments.js";
import renderComments from "./renderComments.js";

export function handleLikeClick(event) {
  const commentId = parseInt(event.target.dataset.id);
  const comment = comments.find((c) => c.id === commentId);

  if (comment.liked) {
    comment.liked = false;
    comment.likes -= 1;
  } else {
    comment.liked = true;
    comment.likes += 1;
  }

  saveComments();
  renderComments();
}

export function handleAddReply(event) {
  const commentId = parseInt(event.target.dataset.id);
  const replyAuthorInput = event.target.parentElement.querySelector(
    ".reply-author-input"
  );
  const replyInput = event.target.parentElement.querySelector(".reply-input");

  const newReply = {
    author: replyAuthorInput.value.trim() || "Аноним",
    text: replyInput.value.trim(),
  };

  if (newReply.text) {
    const comment = comments.find((c) => c.id === commentId);
    comment.replies.push(newReply);
    saveComments();
    replyInput.value = "";
    replyAuthorInput.value = "";
    renderComments();
  }
}

export function handleDeleteComment(event) {
  const commentId = parseInt(event.target.dataset.id);
  const commentIndex = comments.findIndex((c) => c.id === commentId);

  if (commentIndex > -1) {
    comments.splice(commentIndex, 1);
    saveComments();
    renderComments();
  }
}

export function handleAddComment() {
  const commentInput = document.getElementById("comment-input");
  const authorInput = document.getElementById("author-input");
  const newText = commentInput.value.trim();
  const authorName = authorInput.value.trim() || "Аноним";

  if (newText) {
    const newComment = {
      id: comments.length ? Math.max(...comments.map((c) => c.id)) + 1 : 1,
      text: newText,
      likes: 0,
      liked: false,
      author: authorName,
      replies: [],
    };
    comments.push(newComment);
    commentInput.value = "";
    authorInput.value = "";
    saveComments();
    renderComments();
  }
}

