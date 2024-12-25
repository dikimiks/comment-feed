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

export { comments, saveComments };
