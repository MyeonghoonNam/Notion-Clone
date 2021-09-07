import PostsHeader from './PostsHeader.js';
import PostList from './PostList.js';
import { request } from './api.js';
import { route } from './router.js';
import { setItem } from './storage.js';
import { getItem } from './storage.js';

export default function Postspage({ target, onEditor }) {
  const postsPage = document.createElement('nav');
  postsPage.setAttribute('class', 'sidebar');

  new PostsHeader({
    target: postsPage,
    onClick: async () => {
      const createdPost = await request('/documents', {
        method: 'Post',
        body: JSON.stringify({
          title: '',
          parent: null,
        }),
      });

      route(`/documents/${createdPost.id}`);
    },
  });

  const postList = new PostList({
    target: postsPage,
    initialState: [],
    onRemove: async (postId) => {
      const rootOfRemovePosts = findRootOfRemovePosts(Number(postId));
      const selectId = getItem('selectId', []);

      if (selectId.length > 0) {
        if (selectId[0] === postId) {
          setItem('selectId', []);
        }
      }

      await removePosts(rootOfRemovePosts);
      await this.setState();
      await route('/');
    },
    onAdd: async (postId) => {
      const toggleIds = getItem('toggleIds', []);

      if (!toggleIds.includes(postId)) {
        setItem('toggleIds', [...toggleIds, postId]);
      }

      const newPost = await request('/documents', {
        method: 'POST',
        body: JSON.stringify({
          title: '',
          parent: postId,
        }),
      });

      setItem('selectId', [String(newPost.id)]);
      await onEditor(newPost.id);
      await this.setState();
    },
    onPostClick: (postId) => {
      setItem('selectId', [postId]);
      this.setState();
      onEditor(postId);
    },
    onToggle: (postId) => {
      const toggleIds = getItem('toggleIds', []);
      const toggleIdx = toggleIds.findIndex((id) => id === String(postId));

      if (toggleIdx === -1) {
        setItem('toggleIds', [...toggleIds, postId]);
      } else {
        toggleIds.splice(toggleIdx, 1);
        setItem('toggleIds', toggleIds);
      }

      this.setState();
    },
  });

  this.setState = async () => {
    const posts = await request('/documents');
    const toggleIds = getItem('toggleIds', []);
    const selectId = getItem('selectId', []);

    if (toggleIds.length === 0) {
      setItem('toggleIds', toggleIds);
    }

    if (selectId.length === 0) {
      setItem('selectId', selectId);
    }

    const updateState = updatePostsState(posts, toggleIds, selectId);

    postList.setState(updateState);

    this.render();
  };

  this.render = () => {
    target.appendChild(postsPage);
  };

  const updatePostsState = (posts, toggleIds, selectId) => {
    posts.forEach((post) => {
      if (post.documents.length > 0) {
        updatePostsState(post.documents, toggleIds, selectId);
      }

      post.isToggled = toggleIds
        ? toggleIds.includes(String(post.id))
          ? true
          : false
        : false;

      post.isSelected = selectId
        ? selectId.includes(String(post.id))
          ? true
          : false
        : false;
    });

    return posts;
  };

  const findRootOfRemovePosts = (postId) => {
    const queue = [...postList.state];

    while (queue.length > 0) {
      const curPost = queue.shift();

      if (curPost.id === postId) {
        return curPost;
      }

      curPost.documents.forEach((el) => {
        queue.push(el);
      });
    }
  };

  const removePosts = async (root) => {
    const queue = [root];
    const removePostIds = [root.id];
    const toggleIds = getItem('toggleIds', []);
    const selectId = getItem('selectId', []);

    while (queue.length > 0) {
      const curPost = queue.shift();

      if (selectId.length > 0) {
        if (selectId[0] === String(curPost.id)) {
          setItem('selectId', []);
        }
      }

      if (curPost.documents.length === 0) continue;

      curPost.documents.forEach((post) => {
        queue.push(post);
        removePostIds.push(post.id);
      });
    }

    for (let id of removePostIds) {
      const toggleIdx = toggleIds.findIndex(
        (toggleId) => toggleId === String(id)
      );

      if (toggleIdx !== -1) {
        toggleIds.splice(toggleIdx, 1);
        setItem('toggleIds', toggleIds);
      }

      await request(`/documents/${id}`, {
        method: 'DELETE',
      });
    }
  };
}
