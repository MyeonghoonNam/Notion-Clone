import PostsHeader from "./PostsHeader.js";
import PostList from "./PostList.js";
import { request } from "./api.js";
import { route } from "./router.js";

export default function Postspage({target}) {
  const postsPage = document.createElement('nav');

  new PostsHeader({
    target: postsPage,
    initialState: {
      text: 'Page List',
      button: {
        text: '+',
        link: '/documents'
      }
    }
  });

  const postList = new PostList({
    target: postsPage,
    initialState: [],
    onRemove: async postIdList => {
      for(let postId of postIdList) {
        await request(`/documents/${postId}`, {
          method: 'DELETE'
        });
      }
  
      route('/');
    },
    onAdd: async postId => {
      const newPost = await request('/documents', {
        method: 'POST',
        body: JSON.stringify({
          "title": '',
          "parent": postId
        }) 
      });

      route(`/documents/${newPost.id}`);
    }
  });

  this.setState = async () => {
    const posts = await request('/documents');

    postList.setState(posts);
    this.render();
  }

  this.render = async () => {
    target.appendChild(postsPage);
  }
}