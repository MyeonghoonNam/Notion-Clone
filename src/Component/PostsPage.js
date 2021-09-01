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
    },
    onClick: async () => {
      const createdPost = await request('/documents', {
        method: 'Post',
        body: JSON.stringify({
          "title": '',
          "parent": null
        })
      });

      route(`/documents/${createdPost.id}`);
    }
  });

  const postList = new PostList({
    target: postsPage,
    initialState: [],
    onRemove: async postId => {
      postId = Number(postId);
      const nextState = [...postList.state];
      
      const findPost = () => {
        const queue = nextState;

        while(queue.length > 0) {
          const curPost = queue.shift();

          if(curPost.id === postId) {
            return curPost;
          }

          curPost.documents.forEach(el => {
            queue.push(el);
          })
        }
      }

      const removePosts = async (root) => {
        const queue = [root];
        const removePostIds = [root.id];

        while(queue.length > 0) {
          const curPost = queue.shift();

          if(curPost.documents.length === 0) continue;

          curPost.documents.forEach(post => {
            queue.push(post);
            removePostIds.push(post.id);
          });
        }
        
        for(let id of removePostIds) {
          await request(`/documents/${id}`, {
            method: 'DELETE'
          });
        }
      }

      const removePostsRoot = findPost();

      removePosts(removePostsRoot);
      this.setState(nextState);
      // route('/');
      // console.log(nextState);
      // route('/');
      
      // for(let postId of postIdList) {
      //   await request(`/documents/${postId}`, {
      //     method: 'DELETE'
      //   });
      // }
  
      // route('/');
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