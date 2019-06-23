import React from 'react';
import style from './SnippetsEditor.module.scss';

function SnippetsEditor({
  editor,
  handleFormChange,
  submitGist,
  createNewGist,
  deleteGist,
  publicChk,
  handleCheckboxChange,
}) {
  console.log('editor :', editor);
  return (
    // <div className="col-md-auto">
    <div className={style.container}>
      <form className={style.form} action="">
        <div className="name">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={editor.name}
            onChange={event => handleFormChange('name', event.target.value)}
            // id="exampleInputEmail1"
            // aria-describedby="emailHelp"
            placeholder="Name"
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
        <div className={style['button-group']}>
          <button className="btn btn-primary" onClick={createNewGist}>
            Create new snippet
          </button>
          <button className="btn btn-primary" onClick={submitGist}>
            Submit changes
          </button>
          <button className="btn btn-danger" onClick={deleteGist}>
            Delete snippet
          </button>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={!publicChk}
              onChange={handleCheckboxChange}
              id="defaultCheck2"
            />
            <label className="form-check-label" htmlFor="defaultCheck2">
              Private
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SnippetsEditor;
