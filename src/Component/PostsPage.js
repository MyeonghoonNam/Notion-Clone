import PostsHeader from "./PostsHeader.js";
import PostList from "./PostList.js";
import { request } from "./api.js";
import { route } from "./router.js";
import { setItem } from "./storage.js";
import { getItem } from "./storage.js";

export default function Postspage({target}) {
  const postsPage = document.createElement('nav');
  postsPage.setAttribute('class', 'sidebar')

  new PostsHeader({
    target: postsPage,
    initialState: {
      headerText: 'Page List',
      buttonText: '+'
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
      const toggleIds = getItem('toggleIds', []);
      const toggleIdx = toggleIds.findIndex(id => id === String(postId));
      
      if(toggleIdx === -1) {
        setItem('toggleIds', [...toggleIds, postId]);
      } else {
        toggleIds.splice(toggleIdx, 1);
        setItem('toggleIds', toggleIds);
      }

      postList.render();
    }
  });

  this.setState = async () => {
    const posts = await request('/documents');
    const toggleIds = getItem('toggleIds', []);
    // posts.map(post => {
    //   post.isToggled = false;
    // })
    setItem('posts', posts);
    setItem('toggleIds', toggleIds);

    postList.setState(posts);

    this.render();
  }

  this.render = () => {
    target.appendChild(postsPage);
  }
}