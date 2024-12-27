import { comments } from './comments.js'
import {
    handleLikeClick,
    handleAddReply,
    handleDeleteComment,
} from './eventHandlers.js'

export default function renderComments() {
    const container = document.getElementById('comments-container')
    container.innerHTML = ''

    comments.forEach((comment) => {
        const commentElement = document.createElement('div')
        commentElement.classList.add('comment')

        const heartClass = comment.liked ? 'heart liked' : 'heart'

        commentElement.innerHTML = `
            <div class="comment-content">
                <p><strong>${comment.author || 'Аноним'}:</strong> ${comment.text}</p>
                <div class="likes-wrapper">
                    <span class="likes-count">${comment.likes}</span>
                    <span class="${heartClass}" data-id="${comment.id}" aria-label="Лайк">${comment.liked ? '❤️' : '🤍'}</span>
                    <button class="reply-button" data-id="${comment.id}">&rarr;</button>
                    <button class="delete-button" data-id="${comment.id}" style="color: red;">✖</button>
                </div>
            </div>
            <div class="reply-form" id="reply-form-${comment.id}" style="display: none;">
                <input type="text" class="reply-author-input" placeholder="Ваше имя..." required>
                <input type="text" class="reply-input" placeholder="Ваш ответ..." required>
                <button class="add-reply-button" data-id="${comment.id}">Ответить</button>
            </div>
            <div class="replies-container" id="replies-container-${comment.id}"></div>
        `

        commentElement
            .querySelector(`.heart`)
            .addEventListener('click', handleLikeClick)
        commentElement
            .querySelector(`.reply-button`)
            .addEventListener('click', (event) => {
                const replyForm = document.getElementById(
                    `reply-form-${event.target.dataset.id}`,
                )
                replyForm.style.display =
                    replyForm.style.display === 'none' ? 'block' : 'none'
            })
        commentElement
            .querySelector(`.add-reply-button`)
            .addEventListener('click', handleAddReply)
        commentElement
            .querySelector(`.delete-button`)
            .addEventListener('click', handleDeleteComment)

        container.appendChild(commentElement)
    })
}
