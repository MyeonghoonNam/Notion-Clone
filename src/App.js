import Postspage from "./Component/PostsPage.js";
import PostEditPage from "./Component/PostEditPage.js";
import { initRouter } from "./Component/router.js";

export default function App({target, initialState}) {
  const postsPage = new Postspage({target});
  const postEditPage = new PostEditPage({
    target,
    initialState: {
      postId: '',
      post: {
        title: '제목 없음',
        content: '내용 없음',
      }
    }
  });

  this.state = initialState;

  this.route = () => {
    target.innerHTML = '';
    
    const {pathname} = location;
    
    if(pathname === '/') {
      postsPage.setState();
    } else if(pathname.indexOf('/documents/') === 0) {
      const [, , postId] = pathname.split('/');

      postsPage.setState();
      postEditPage.setState({postId});
    }
  }

  this.route();
  initRouter(() => this.route());
}