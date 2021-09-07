export default function PostList({
  target,
  initialState,
  onRemove,
  onAdd,
  onPostClick,
  onToggle,
}) {
  const postList = document.createElement('div');
  postList.setAttribute('class', 'post__list');

  target.appendChild(postList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    postList.innerHTML = createdPostList(this.state, 0); // 상태, 기본 패딩 값

    postList.querySelector('ul').addEventListener('click', (e) => {
      const clickElement =
        e.target.tagName === 'I' ? e.target.closest('button') : e.target;
      const { className } = clickElement;
      const post = clickElement.closest('li');
      const postId = post.dataset.id;

      if (post.className !== 'post__row--none') {
        if (className === 'post__button--delete') {
          onRemove(postId);
        } else if (className === 'post__button--add') {
          onAdd(postId);
        } else if (className === 'post__button--toggle') {
          onToggle(postId);
        } else {
          onPostClick(postId);
        }
      }
    });
  };

  const createdPostList = (documents, postRowItemPadding) => {
    postRowItemPadding += 10;

    return /* html */ `
      <ul>
        ${documents
          .map(
            ({ id, title, documents, isToggled, isSelected }) => /* html */ `
              <li class="post__row" data-id="${id}">
                <div class="post__row__items${
                  isSelected ? ' post__row__items--selected' : ''
                }" style="padding-left:${postRowItemPadding}px">
                  <div class="post__row__items--textbox">
                    <button class="post__button--toggle">
                      ${
                        isToggled
                          ? `<i class="fas fa-caret-down"></i>`
                          : `<i class="fas fa-caret-right"></i>`
                      }
                    </button>
                    <span class="post__text">${
                      title ? title : '제목 없음'
                    }</span>
                  </div>
                  <div class="post__row__items--buttonbox">
                    <button class="post__button--add"><i class="far fa-plus-square"></i></button>
                    <button class="post__button--delete"><i class="far fa-minus-square"></i></button>
                  </div>
                  </div>
                ${
                  isToggled
                    ? documents.length > 0
                      ? createdPostList(documents, postRowItemPadding)
                      : `<ul>
                          <li class="post__row--none" style="padding-left:${postRowItemPadding}px">
                            하위 페이지가 없습니다.
                          </li>
                        </ul>`
                    : ''
                }
              </li>`
          )
          .join('')}
      </ul>
    `;
  };

  this.render();
}
