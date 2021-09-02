export default function PostsHeader({target, initialState, onClick}) {
  const postsHeader = document.createElement('div');
  const postsHeaderText = document.createElement('span');
  const postsHeaderButton = document.createElement('button');

  postsHeader.appendChild(postsHeaderText);
  postsHeader.appendChild(postsHeaderButton);
  
  target.appendChild(postsHeader);
 
  this.state = initialState;

  this.render = () => {
    postsHeaderText.innerText = this.state.headerText;
    postsHeaderButton.innerText = this.state.buttonText;
  }
  
  this.render();

  postsHeaderButton.addEventListener('click', () => {
    onClick();
  })
}