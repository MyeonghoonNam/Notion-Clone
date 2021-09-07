import { request } from './api.js';
import Editor from './Editor.js';
import { route } from './router.js';

export default function PostEditPage({
  target,
  initialState,
  onClickSubDocument,
  onChangeEditorTitle,
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

        await onChangeEditorTitle();
      }, 1000);
    },
    onClickSubDocument: async (postId) => {
      await this.setState({ postId });
      await onClickSubDocument(postId);
    },
  });

  this.setState = async (nextState) => {
    try {
      const post = await request(`/documents/${nextState.postId}`);

      editor.setState(post);
      this.render();
    } catch (e) {
      alert('해당 문서를 찾을 수 없습니다. 메인 페이지로 돌아갑니다.');
      route('/');
    }
  };

  this.render = () => {
    target.appendChild(page);
  };

  this.render();
}
