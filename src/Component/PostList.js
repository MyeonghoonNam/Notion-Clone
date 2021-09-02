import { getItem } from "./storage.js";

export default function PostList({target, initialState, onRemove, onAdd, onPostClick, onToggle}) {
  const postList = document.createElement('div');

  target.appendChild(postList);

  this.state = initialState;

  this.setState = nextState => {
    console.log(nextState);
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    postList.innerHTML = createdPostList(this.state);

    postList.querySelector('ul').addEventListener('click', (e) => {
      const clickElement = e.target;
      const {className} = clickElement;
      const post = clickElement.closest('li');
      const postId = post.dataset.id;
  
      if(post) {
        if(className === 'post__button--delete') {
          onRemove(postId);
        } else if(className === 'post__button--add') {
          onAdd(postId);
        } else if(className.includes("post__button--toggle")) {
          onToggle(postId);
        } else {
          onPostClick(postId);
        }
      }
    });
  }

  const createdPostList = (documents) => {
    const toggleIds = getItem('toggleIds', []);

    return /* html */ `
      <ul>
        ${documents.map(({id, title, documents}) => /* html */ `
          <li class="post__row" data-id="${id}">
            <i class="fas fa-caret-right post__button--toggle"></i>
            ${title ? title : '제목 없음'}
            <button class="post__button--delete">X</button>
            <button class="post__button--add">+</button>
            ${toggleIds.includes(String(id)) ? documents.length ? createdPostList(documents) : '<ul><li>하위 페이지가 없습니다.</li></ul>' : ''}
          </li>
        `).join('')}
      </ul>
    `
  };
  
  this.render();
}