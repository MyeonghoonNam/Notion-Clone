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
    },
    onPostClick: (postId) => {
      route(`/documents/${postId}`);
    },
    onToggle: postId => {
      postId = Number(postId);
      
      const nextState = [...postList.state];
      const queue = [...nextState];

      while(queue.length > 0) {
        const curPost = queue.shift();

        if(curPost.id === postId) {
          curPost.isToggled = !curPost.isToggled;
          break;
        }

        curPost.documents.forEach(el => {
          queue.push(el);
        })
      }

      postList.setState(nextState);
    }
  });

  this.setState = async () => {
    const posts = await request('/documents');

    posts.map(post => {
      post.isToggled = false;
    })

    postList.setState(posts);
    this.render();
  }

  this.render = () => {
    target.appendChild(postsPage);
  }
}