import { comments } from "./modules/comments.js";
import renderComments from "./modules/renderComments.js";
import { handleAddComment } from "./modules/eventHandlers.js";

renderComments();

document
  .getElementById("add-comment-button")
  .addEventListener("click", handleAddComment);

window.addEventListener("storage", renderComments);

