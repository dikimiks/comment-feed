import { comments } from "./comments.js";
import renderComments from "./renderComments.js";
import { handleAddComment } from "./eventHandlers.js";

renderComments();

document
  .getElementById("add-comment-button")
  .addEventListener("click", handleAddComment);

window.addEventListener("storage", renderComments);
