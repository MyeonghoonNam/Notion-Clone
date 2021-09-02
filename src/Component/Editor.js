export default function Editor({target, initialState, onEditing}) {
  const editor = document.createElement('section');
  editor.setAttribute('class', 'editor');

  target.appendChild(editor);

  let isInitialize = false;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    const {title, content} = this.state;

    editor.querySelector('.editor__title').value = title ? title : '';
    editor.querySelector('.editor__content').value = content ? content : '';

    this.render();
  }

  this.render = () => {
    if(!isInitialize) {
      editor.innerHTML = /* HTML */ `
        <input class="editor__title" name="title" type="text" value="${this.state.title}" ${this.state.title ? '' : 'placeholder="제목 없음"'}/>
        <textarea class="editor__content" name="content" ${this.state.content ? '' : 'placeholder="내용 없음"'}>${this.state.content}</textarea>
      `

      isInitialize = true;
    } 

  }
  
  this.render();

  editor.addEventListener('keyup', e => {
    const {name} = e.target;

    if(this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: e.target.value
      }

      this.setState(nextState);
      onEditing(this.state);
    }
  })
}