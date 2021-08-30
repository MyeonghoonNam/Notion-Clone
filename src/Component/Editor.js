export default function Editor({target, initialState, onEditing}) {
  const editor = document.createElement('div');
  let isInitialize = false;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    const {title, content} = this.state;

    editor.querySelector('[name=title]').value = title ? title : '제목 없음';
    editor.querySelector('[name=content]').value = content ? content : '내용 없음';

    this.render();
  }

  this.render = () => {
    if(!isInitialize) {
      editor.innerHTML = /* HTML */ `
        <input type="text" name="title" style="width:600px; display:block" value="${this.state.title}"/>
        <textarea name="content" style="width:600px; height:400px">${this.state.content}</textarea>
      `

      isInitialize = true;
      target.appendChild(editor);
    } 
  }
  
  this.render();
}