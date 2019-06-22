import React from 'react';
import style from './SnippetsEditor.module.scss';

function SnippetsEditor({ editor, handleFormChange }) {
  console.log('editor :', editor);
  return (
    // <div className="col-md-auto">
    <div className={style.container}>
      <form className={style.form} action="">
        <div className="name">
          <label>Email address</label>
          <input
            type="text"
            className="form-control"
            value={editor.name}
            onChange={event => handleFormChange('name', event.target.value)}
            // id="exampleInputEmail1"
            // aria-describedby="emailHelp"
            placeholder="Enter snippet name"
          />
        </div>
        <div className="description">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            value={editor.desc}
            onChange={event => handleFormChange('desc', event.target.value)}
            // id="exampleInputPassword1"
            placeholder="Description"
          />
        </div>
        <div className="content">
          <label>Content</label>
          <textarea
            rows="10"
            value={editor.content}
            onChange={event => handleFormChange('content', event.target.value)}
            className="form-control"
            // id="exampleInputPassword1"
            placeholder="Content"
          />
        </div>
      </form>
    </div>
  );
}

export default SnippetsEditor;
