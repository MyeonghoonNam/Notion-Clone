export default function PostsHeader({target, onClick}) {
  const postsHeader = document.createElement('div');
  postsHeader.setAttribute('class', 'post__header');

  target.appendChild(postsHeader);
 
  this.render = () => {
    postsHeader.innerHTML = /* HTML */ `
      <span>Page List</span>
      <button class="post__button--add"><i class="far fa-plus-square"></i></button>
    `
  }
  
  this.render();

  postsHeader.querySelector('button').addEventListener('click', () => {
    onClick();
  })
}