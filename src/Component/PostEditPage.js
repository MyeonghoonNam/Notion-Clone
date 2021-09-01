import { request } from "./api.js";
import Editor from "./Editor.js";

export default function PostEditPage({target, initialState}) {
  const page = document.createElement('main');
  page.setAttribute('class', 'content');

  let timer = null;

  const editor = new Editor({
    target: page,
    initialState: initialState.post
  });

  this.setState = async nextState => {
    const post = await request(`/documents/${nextState.postId}`);

    editor.setState(post);
    this.render();
  }

  this.render = () => {
    target.appendChild(page);
  }

  this.render();

}