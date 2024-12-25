const comments = JSON.parse(localStorage.getItem("comments")) || [
  {
    id: 1,
    text: "Красивые",
    likes: 2,
    liked: false,
    author: "Пользователь1",
    replies: [],
  },
  {
    id: 2,
    text: "Класс!",
    likes: 4,
    liked: false,
    author: "Пользователь2",
    replies: [],
  },
  {
    id: 3,
    text: "бейби шарк тутуруду",
    likes: 1,
    liked: false,
    author: "Пользователь3",
    replies: [],
  },
  {
    id: 4,
    text: "Новый комментарий",
    likes: 0,
    liked: false,
    author: "Пользователь4",
    replies: [],
  },
  {
    id: 5,
    text: "Еще один комментарий",
    likes: 0,
    liked: false,
    author: "Пользователь5",
    replies: [],
  },
];

function saveComments() {
  localStorage.setItem("comments", JSON.stringify(comments));
}

function renderComments() {
  const container = document.getElementById("comments-container");
  container.innerHTML = "";

  comments.forEach((comment) => {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");

    const heartClass = comment.liked ? "heart liked" : "heart";

    commentElement.innerHTML = `
            <div class="comment-content">
                <p><strong>${comment.author || "Аноним"}</strong>: ${comment.text}</p>
                <div class="likes-wrapper">
                    <span class="likes-count">${comment.likes}</span>
                    <span class="${heartClass}" data-id="${comment.id}" aria-label="Лайк">${comment.liked ? "❤️" : "🤍"}</span>
                    <button class="reply-button" data-id="${comment.id}">&#8594;</button>
                    <button class="delete-button" data-id="${comment.id}" style="color: red;">✖</button>
                </div>
            </div>
            <div class="reply-form" id="reply-form-${comment.id}" style="display: none;">
                <input type="text" class="reply-author-input" placeholder="Ваше имя..." required>
                <input type="text" class="reply-input" placeholder="Ваш ответ..." required>
                <button class="add-reply-button" data-id="${comment.id}">Ответить</button>
            </div>
            <div class="replies-container" id="replies-container-${comment.id}"></div>
        `;

    const repliesContainer = commentElement.querySelector(
      `#replies-container-${comment.id}`,
    );
    comment.replies.forEach((reply) => {
      const replyElement = document.createElement("div");
      replyElement.classList.add("reply");
      replyElement.innerHTML = `<strong>${reply.author}:</strong> ${reply.text}`;
      repliesContainer.appendChild(replyElement);
    });

    container.appendChild(commentElement);
  });

  const likeButtons = container.querySelectorAll(".heart");
  likeButtons.forEach((button) => {
    button.addEventListener("click", handleLikeClick);
  });

  const replyButtons = container.querySelectorAll(".reply-button");
  replyButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const replyForm = document.getElementById(
        `reply-form-${event.target.dataset.id}`,
      );
      const comment = comments.find(
        (c) => c.id === parseInt(event.target.dataset.id),
      );

      const replyAuthorInput = replyForm.querySelector(".reply-author-input");
      const replyInput = replyForm.querySelector(".reply-input");

      replyInput.value = `@<span class="quoted-text">${comment.author}</span>: ${comment.text}`;
      replyAuthorInput.value = "";

      replyForm.style.display =
        replyForm.style.display === "none" ? "block" : "none";
    });
  });

  const addReplyButtons = container.querySelectorAll(".add-reply-button");
  addReplyButtons.forEach((button) => {
    button.addEventListener("click", handleAddReply);
  });

  const deleteButtons = container.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", handleDeleteComment);
  });
}

function handleLikeClick(event) {
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

function handleAddReply(event) {
  const commentId = parseInt(event.target.dataset.id);
  const replyAuthorInput = event.target.parentElement.querySelector(
    ".reply-author-input",
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

function handleDeleteComment(event) {
  const commentId = parseInt(event.target.dataset.id);
  const commentIndex = comments.findIndex((c) => c.id === commentId);

  if (commentIndex > -1) {
    comments.splice(commentIndex, 1);
    saveComments();
    renderComments();
  }
}

document.getElementById("add-comment-button").addEventListener("click", () => {
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
});

renderComments();
