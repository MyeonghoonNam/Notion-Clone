import { route } from "./router.js";

export default function PostList({target, initialState, onRemove}) {
  const postList = document.createElement('div');

  target.appendChild(postList);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    postList.innerHTML = /* html */ `
      <ul>
        ${this.state.map(post => /* html */ `
          <li class="" data-id="${post.id}">
            ${post.title ? post.title : '제목 없음'}
            <button class="page__button--delete">X</button>
            <button class="page__button--add">+</button>
          </li>
        `).join('')}
      </ul>
    `

    postList.querySelector('ul').addEventListener('click', (e) => {
      const clickElement = e.target;
      const {className} = clickElement;
      const post = clickElement.closest('li');
      const postId = post.dataset.id;

      if(post) {
        if(className === 'page__button--delete') {
          onRemove(postId);
        } else if(className === 'page__button--add') {
          
        } else {
          route(`/documents/${postId}`);
        }
      }
    })
  }

  this.render();

}