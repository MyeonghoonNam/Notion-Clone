import { getItem } from "./storage.js";

export default function PostList({target, initialState, onRemove, onAdd, onPostClick, onToggle}) {
  const postList = document.createElement('div');

  target.appendChild(postList);

  this.state = initialState;

  this.setState = nextState => {
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
            <div class="post__row__items">
              <div class="post__row__items--textbox">
                <button class="post__button--toggle"><i class="fas fa-caret-right"></i></button>
                <span>${title ? title : '제목 없음'}</span>
              </div>
              <div class="post__row__items--buttonbox">
                <button class="post__button--add"><i class="far fa-plus-square"></i></button>
                <button class="post__button--delete"><i class="far fa-minus-square"></i></button>
              </div>
            </div>
            ${toggleIds.includes(String(id)) ? documents.length ? createdPostList(documents) : '<ul><li>하위 페이지가 없습니다.</li></ul>' : ''}
          </li>
        `).join('')}
      </ul>
    `
  };
  
  this.render();
}