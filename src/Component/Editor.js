export default function Editor({target, initialState, onEditing}) {
  const editor = document.createElement('section');
  editor.setAttribute('class', 'editor');
  let isInitialize = false;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    const {title, content} = this.state;

    editor.querySelector('.editor__title').value = title ? title : '제목 없음';
    editor.querySelector('.editor__content').value = content ? content : '내용 없음';

    this.render();
  }

  this.render = () => {
    if(!isInitialize) {
      editor.innerHTML = /* HTML */ `
        <input class="editor__title" type="text" value="${this.state.title}"/>
        <textarea class="editor__content">${this.state.content}</textarea>
      `

      isInitialize = true;
      target.appendChild(editor);
    } 
  }
  
  this.render();
}