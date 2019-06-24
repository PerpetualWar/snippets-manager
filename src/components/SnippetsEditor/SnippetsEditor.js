import React from 'react';
import style from './SnippetsEditor.module.scss';

function SnippetsEditor({
  editor,
  handleFormChange,
  submitGist,
  clearEditor,
  deleteGist,
  publicChk,
  handleCheckboxChange,
  files,
  handleAddFile,
  fileSelectOption,
  handleFileSelect,
  isEmptyEditor,
  isAddingFile,
}) {
  console.log('editor :', editor);
  const numberOfFiles = Object.keys(files).length;
  return (
    // <div className={`col-lg-6 ${style.container}`}>

    <div className={style.container}>
      <div>
        <div className={style.info}>
          <div>
            {!isAddingFile && isEmptyEditor
              ? ''
              : publicChk
              ? 'Public snippet'
              : 'Private snippet'}
          </div>
          {!isAddingFile && isEmptyEditor
            ? ''
            : numberOfFiles > 0 && <div>No of files: {numberOfFiles}</div>}

          {(isAddingFile || !isEmptyEditor) && (
            <button
              onClick={handleAddFile}
              className={`btn btn-light ${style['button-add-file']}`}
            >
              Add file
            </button>
          )}
        </div>
        {!isEmptyEditor && !isAddingFile && (
          <div>
            Edit file:
            <select
              value={fileSelectOption}
              className="custom-select custom-select-sm"
              onChange={event => handleFileSelect(event)}
            >
              {Object.values(files).map(file => (
                <option key={file.id} value={file.filename}>
                  {file.filename}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <form className={style.form} action="">
        <div className="name">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={editor.name}
            onChange={event => handleFormChange('name', event.target.value)}
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
            placeholder="Content"
          />
        </div>
        <div className={style['button-group']}>
          <button className="btn btn-light" onClick={clearEditor}>
            Clear editor
          </button>
          <button className="btn btn-light" onClick={submitGist}>
            {isEmptyEditor ? 'Create new snippet' : 'Edit snippet'}
          </button>
          <button className="btn btn-danger" onClick={deleteGist}>
            Delete snippet
          </button>
          {isEmptyEditor && (
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={!publicChk}
                onChange={handleCheckboxChange}
                id="check1"
              />
              <label className="form-check-label" htmlFor="check1">
                Private
              </label>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default SnippetsEditor;
