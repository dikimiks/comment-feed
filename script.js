
const comments = [
    { id: 1, text: " Красивые", likes: 2, liked: false },
    { id: 2, text: "Класс!", likes: 4, liked: false },
    { id: 3, text: "бейби шарк тутуруду", likes: 1, liked: false },
];


function renderComments() {
    const container = document.getElementById('comments-container');
    container.innerHTML = '';

    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');

        const heartClass = comment.liked ? 'heart liked' : 'heart';

    
        commentElement.innerHTML = `
        <div class="comment-content">
            <p>${comment.text}</p>
            <div class="likes-wrapper">
                <span class="likes-count">${comment.likes}</span>
                <span class="${heartClass}" data-id="${comment.id}" aria-label="Лайк">${comment.liked ? '❤️' : '🤍'}</span>
            </div>
        </div>
    `;

        container.appendChild(commentElement);
    });

    const likeButtons = container.querySelectorAll('.heart');
    likeButtons.forEach(button => {
        button.addEventListener('click', handleLikeClick);
    });
}

function handleLikeClick(event) {
    const commentId = parseInt(event.target.dataset.id);
    const comment = comments.find(c => c.id === commentId);

    if (comment.liked) {
        comment.liked = false;
        comment.likes -= 1;
    } else {
        comment.liked = true;
        comment.likes += 1;
    }

    renderComments(); 
}

document.getElementById('add-comment-button').addEventListener('click', () => {
    const commentInput = document.getElementById('comment-input');
    const newText = commentInput.value.trim();

    if (newText) {
        const newComment = {
            id: comments.length + 1,
            text: newText,
            likes: 0,
            liked: false
        };
        comments.push(newComment);
        commentInput.value = ''; 
        renderComments(); 
    }
});


renderComments();