export default function PostList({target, initialState, onRemove, onAdd, onPostClick, onToggle}) {
  const postList = document.createElement('div');

  target.appendChild(postList);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    console.log(this.state);
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
    })
  }

  const createdPostList = (documents) => {

    return /* html */ `
      <ul>
        ${documents.map(({id, title, documents, isToggled}) => /* html */ `
          <li class="post__row" data-id="${id}">
            <i class="fas fa-caret-right post__button--toggle"></i>
            ${title ? title : '제목 없음'}
            <button class="post__button--delete">X</button>
            <button class="post__button--add">+</button>
            ${isToggled ? documents.length ? createdPostList(documents) : '<ul><li>하위 페이지가 없습니다.</li></ul>' : ''}
          </li>
        `).join('')}
      </ul>
    `
  };

  // const removePostId = (post, postId) => {
  //   const queue = [post];
  //   const removePosts = [postId];

  //   while(queue.length > 0) {
  //     const root = queue.shift();

  //     root.childNodes.forEach(el => {
  //       if(el.nodeName === 'UL') {
        
  //         el.childNodes.forEach(list => {
  //           if(list.nodeName === 'LI') {
  //             queue.push(list);
  //             removePosts.push(list.dataset.id);
  //           }
  //         });
  //       }
  //     })
  //   }
    
  //   return removePosts;
  // }

  this.render();

}