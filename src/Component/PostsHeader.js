import { route } from "./router.js";
import {request} from "./api.js"

export default function PostsHeader({target, initialState}) {
  const postsHeader = document.createElement('div');
  const postsHeaderText = document.createElement('span');
  const postsHeaderButton = document.createElement('button');

  this.state = initialState;

  this.render = () => {
    postsHeader.appendChild(postsHeaderText);
    postsHeader.appendChild(postsHeaderButton);

    postsHeaderText.innerText = this.state.text;
    postsHeaderButton.innerText = this.state.button.text;

    target.appendChild(postsHeader);
  }

  this.render();

  postsHeaderButton.addEventListener('click', async () => {
    const createdPost = await request(`${this.state.button.link}`, {
      method: 'Post',
      body: JSON.stringify({
        "title": '',
        "parent": null
      })
    });

    route(`${this.state.button.link}/${createdPost.id}`);
  })
}