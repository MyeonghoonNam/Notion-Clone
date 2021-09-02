import Postspage from "./Component/PostsPage.js";
import PostEditPage from "./Component/PostEditPage.js";
import { initRouter } from "./Component/router.js";

export default function App({target, initialState}) {
  const postsPage = new Postspage({
    target, 
    onEditor: (postId) => {
      history.pushState(null, null, `/documents/${postId}`);
      postEditPage.setState({postId});
    }
  });

  const postEditPage = new PostEditPage({
    target,
    initialState: {
      postId: '',
      post: {
        title: '',
        content: '',
      }
    }
  });

  this.state = initialState;

  this.route = async () => {
    target.innerHTML = '';
    
    const {pathname} = location;
    
    if(pathname === '/') {
      postsPage.setState();
    } else if(pathname.indexOf('/documents/') === 0) {
      const [, , postId] = pathname.split('/');

      await postsPage.setState();
      await postEditPage.setState({postId});
    }
  }

  this.route();
  initRouter(() => this.route());
}