import { request } from './api.js';
import Editor from './Editor.js';

export default function PostEditPage({
  target,
  initialState,
  onChangeSidebar,
}) {
  const page = document.createElement('main');
  page.setAttribute('class', 'content');

  let timer = null;

  const editor = new Editor({
    target: page,
    initialState: initialState.post,
    onEditing: (post) => {
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        await request(`/documents/${post.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            title: post.title,
            content: post.content,
          }),
        });

        await onChangeSidebar(postId);
      }, 1000);
    },
    onClickSubDocument: async (postId) => {
      await this.setState({ postId });
      await onChangeSidebar(postId);
    },
  });

  this.setState = async (nextState) => {
    const post = await request(`/documents/${nextState.postId}`);

    editor.setState(post);
    this.render();
  };

  this.render = () => {
    target.appendChild(page);
  };

  this.render();
}
