export default function Editor({ target, initialState, onEditing }) {
  const editor = document.createElement('section');
  editor.setAttribute('class', 'editor');
  let isInit = false;

  target.appendChild(editor);

  this.state = initialState;

  this.setState = (nextState, isRender = true) => {
    this.state = nextState;

    if (isRender) {
      this.render();
    }
  };

  this.render = () => {
    let { title, content } = this.state;

    if (!isInit) {
      editor.innerHTML = /* HTML */ `
        <input
          class="editor__title"
          name="title"
          type="text"
          placeholder="제목 없음"
          autocomplete="off"
        />
        <div
          class="editor__content"
          name="content"
          contenteditable="true"
        ></div>
      `;

      isInit = true;
    }

    editor.querySelector('.editor__title').value = title;
    editor.querySelector('.editor__content').innerHTML = content;
  };

  editor.addEventListener('keyup', (e) => {
    const editorElement = e.target.closest('[name]');
    const nextState = { ...this.state };
    const { anchorNode } = window.getSelection();

    if (editorElement) {
      // input(title), div(content)
      const editorTag = editorElement.getAttribute('name');

      switch (editorTag) {
        case 'title':
          const text = editorElement.value;

          nextState[editorTag] = text;
          onEditing(nextState);

          break;
        case 'content':
          const key = e.key; // 입력된 키보드의 키 종류

          if (editorShortcutKey(key, anchorNode)) return;

          const { innerHTML } = editorElement;

          nextState[editorTag] = innerHTML;
          onEditing(nextState);

          break;
      }

      // 현재 커서 정보에 대한 렌더링이 필요하지 않으며 editor의 상태는 업데이트 한다.
      this.setState(nextState, false);
    }
  });

  const editorShortcutKey = (key, node) => {
    // 단축키 기능 생각나는대로 추가하기
    switch (key) {
      case ' ':
        createRichTag(node.parentNode, node.textContent);
        return true;
      default:
        return false;
    }
  };

  const createRichTag = (node, text) => {
    const parentNode = editor.querySelector('[name=content]');

    let tag;

    if (text.indexOf('####') === 0 || !text.startsWith('#')) {
      return;
    } else if (text.indexOf('###') === 0) {
      tag = document.createElement('h3');
      tag.innerText = text.substring(4);
    } else if (text.indexOf('##') === 0) {
      tag = document.createElement('h2');
      tag.innerText = text.substring(3);
    } else if (text.indexOf('#') === 0) {
      tag = document.createElement('h1');
      tag.innerText = text.substring(2);
    }

    // 현재 tag는 빈 상태이므로 초기값을 지정
    tag.innerHTML = '<br>';

    if (node.parentNode === parentNode) {
      parentNode.replaceChild(tag, node); // key가 입력되어진 상태의 div 태그를 생성한 tag로 치환한다.
      console.log(parentNode);
    } else {
      // Editor의 content에서 가장 첫 줄에 해당하는 내용은 부모요소가 새로 생성된 div가 아니라 ediotr를 가리키므로 아래와 같이 초기화한다.
      parentNode.innerHTML = '';
      parentNode.appendChild(tag);
    }

    //생성된 태그의 가정 첫 번째로 커서를 이동시킨다.
    window.getSelection().collapse(tag, 0);
  };
}
