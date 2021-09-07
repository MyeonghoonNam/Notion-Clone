import Postspage from './Component/PostsPage.js';
import PostEditPage from './Component/PostEditPage.js';
import { initRouter } from './Component/router.js';
import { setItem } from './Component/storage.js';

export default function App({ target, initialState }) {
  const postsPage = new Postspage({
    target,
    onChangeEditor: (postId) => {
      history.pushState(null, null, `/documents/${postId}`);
      postEditPage.setState({ postId });
    },
  });

  const postEditPage = new PostEditPage({
    target,
    initialState: {
      postId: '',
      post: {
        title: '',
        content: '',
      },
    },
    onClickSubDocument: (postId) => {
      setItem('selectId', [postId]);
      history.pushState(null, null, `/documents/${postId}`);
      postsPage.setState();
    },
    onChangeEditorTitle: () => {
      postsPage.setState();
    },
  });

  this.state = initialState;

  this.route = async () => {
    target.innerHTML = '';

    const { pathname } = location;

    if (pathname === '/') {
      setItem('selectId', []);
      await postsPage.setState();
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , postId] = pathname.split('/');

      await postsPage.setState();
      await postEditPage.setState({ postId });
    }
  };

  this.route();
  initRouter(() => this.route());
}
