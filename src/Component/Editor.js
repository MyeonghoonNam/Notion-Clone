export default function Editor({target, initialState, onEditing}) {
  const editor = document.createElement('section');
  editor.setAttribute('class', 'editor');

  target.appendChild(editor);

  editor.innerHTML = /* HTML */ `
        <input class="editor__title" name="title" type="text" placeholder="제목 없음" autocomplete="off"/>
        <div class="editor__content" name="content" contenteditable="true" ></div>
      `
  
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    let {title, content} = this.state;

    // 수정 예정

    // if(content) {
    //   content.replace(/<div>/g, '<br>');
    // }
    // const richContent = content ? content.split('<div>').map(line => {
    //   if (line.indexOf('# ') === 0) {
    //     return `<h1>${line.substr(2)}</h1>`;
    //   } else if (line.indexOf('## ') === 0) {
    //     return `<h2>${line.substr(3)}</h2>`;
    //   } else if (line.indexOf('### ') === 0) {
    //     return `<h3>${line.substr(4)}</h3>`;
    //   } else if(line.indexOf('<br>') === 0){
    //     return `<div><br></div>`
    //   }

    //   return line;
    // }).join('<br>') :
    // '';
    // console.log(richContent);

    editor.querySelector('.editor__title').value = title;
    editor.querySelector('.editor__content').innerHTML = content;
  }
  
  this.render();

  editor.querySelector('[name=title]').addEventListener('keyup', e => {
    const nextState = {
        ...this.state,
        title: e.target.value
    }
    this.setState(nextState);
    onEditing(this.state);
  })

  editor.querySelector('[name=content]').addEventListener('keypress', e => {
    const nextState = {
        ...this.state,
        content: e.target.innerHTML
    }

    this.setState(nextState);
    onEditing(this.state);

    const selection = window.getSelection();

    selection.selectAllChildren(document.querySelector('[name=content]'));
    selection.collapseToEnd();
  });
}