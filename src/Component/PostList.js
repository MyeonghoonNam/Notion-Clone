export default function PostList({target, initialState}) {
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
          <li data-id="${post.id}">${post.title}</li>
        `)}
      </ul>
    `
  }

  this.render();

  postList.addEventListener('click', (e) => {
    const post = e.target.closest('li');
    
  })
}