import React, { Component } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import Notification from '../../components/Notification/Notification';
import Header from '../../components/Header/Header';
import SnippetsList from '../../components/SnippetsList/SnippetsList';
import SnippetsEditor from '../../components/SnippetsEditor/SnippetsEditor';
import Storage from '../../util/storage';
import { initiateLogin } from '../../services/api/login';
import {
  getUserGists,
  getSingleGist,
  editGist,
  createGist,
  deleteGist,
} from '../../services/api/gists';
import { getUserInfo } from '../../services/api/users';
import style from './Home.module.scss';

class Home extends Component {
  state = {
    userGists: null,
    pageNumber: 1,
    editor: {
      id: '',
      name: '',
      desc: '',
      content: '',
    },
    selectedItemFiles: [],
    fileSelectOption: '',
    editedFileName: '',
    allGistsListed: false,
    profile: null,
    loading: false,
    selectedItemId: null,
    selectedItem: null,
    publicChk: true,
    error: true,
    errorMsg: '',
    notificationActive: false,
    isAddingFile: false,
  };

  editorEmpty = {
    id: '',
    name: '',
    desc: '',
    content: '',
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    if (Storage.get('access_token')) {
      const { data } = await getUserInfo();
      this.setState({ profile: data });
      await this.fetchUserGists();
    }
    this.setState({ loading: false });
  };

  fetchUserGists = async () => {
    await this.setState({ pageNumber: 1 });
    const { data } = await getUserGists(
      this.state.profile.login,
      this.state.pageNumber
    );
    this.setState({ userGists: data, allGistsListed: false });
  };

  loadSnippets = async () => {
    const { pageNumber } = this.state;

    this.setState({ loading: true });
    await this.setState({ pageNumber: pageNumber + 1 });
    const { data } = await getUserGists(
      this.state.profile.login,
      this.state.pageNumber
    );

    if (data.length > 0) {
      this.setState({ userGists: [...this.state.userGists, ...data] });
    } else {
      this.setState({ allGistsListed: true });
    }
    this.setState({ loading: false });
  };

  handleFormChange = (inputType, value) => {
    const editor = { ...this.state.editor };
    editor[inputType] = value;
    this.setState({ editor });
  };

  loginLogic = () => {
    initiateLogin();
  };

  logoutLogic = () => {
    Storage.remove('access_token');
    this.setState({
      profile: null,
      selectedItemId: null,
      editor: this.editorEmpty,
    });
    this.forceUpdate();
  };

  selectItem = (id, files) => {
    const editedFileName = Object.keys(files)[0];

    this.setState({
      selectedItemId: id,
      editedFileName,
      selectedItemFiles: files,
    });
    this.populateEditor(id, editedFileName);

    this.moveToEditor();
  };

  moveToEditor = () => {
    // document.getElementById('editor').scrollIntoView({
    //   behavior: 'smooth',
    // });
    const element = document.getElementById('editor');
    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    const middle = absoluteElementTop - window.innerHeight / 2;
    window.scrollTo({ left: 0, top: middle, behavior: 'smooth' });
  };

  populateEditor = async (gistId, fileName) => {
    try {
      this.setState({ loading: true });
      //we must fetch here cause content is not provided in get all gists api call
      const { data } = await getSingleGist(gistId);

      this.setState({ selectedItem: data.files[fileName] });

      const editor = {
        id: data.id,
        name: fileName,
        desc: data.description,
        content: data.files[fileName].content,
      };

      const publicChk = data.public;

      this.setState({ editor, publicChk, loading: false });
    } catch (error) {
      this.setState({ loading: false });
      this.showNotification('Snippet could not be loaded');
      console.error(error);
    }
  };

  submitGist = async event => {
    event.preventDefault();
    const {
      editor,
      selectedItemId,
      publicChk,
      editedFileName,
      isAddingFile,
    } = this.state;

    let files;

    if (!isAddingFile) {
      files = {
        [editedFileName]: {
          content: editor.content,
          filename: editor.name,
        },
      };
    } else {
      files = {
        [editor.name]: {
          content: editor.content,
          filename: editor.name,
        },
      };
    }

    try {
      if (!selectedItemId) {
        //create gist
        //////////////////////////////
        this.setState({ loading: true });
        await createGist(files, editor.desc, publicChk);

        this.fetchUserGists();
        this.setState({
          selectedItemId: null,
          editor: this.editorEmpty,
          fileSelectOption: '',
          loading: false,
        });
      } else {
        //edit gist
        ///////////////////////////////
        this.setState({ loading: true });
        await editGist(selectedItemId, files, editor.desc);
        this.fetchUserGists();
        this.setState({
          selectedItemId: null,
          editor: this.editorEmpty,
          isAddingFile: false,
          fileSelectOption: '',
          loading: false,
        });
      }
    } catch (error) {
      this.setState({ loading: false });
      this.showNotification('Please enter data or select existing snippet');
      console.error(error);
    }
  };

  clearEditor = event => {
    event.preventDefault();
    this.setState({
      selectedItemId: null,
      editor: this.editorEmpty,
      isAddingFile: false,
      fileSelectOption: '',
    });
  };

  deleteGist = async event => {
    event.preventDefault();
    const { selectedItemId } = this.state;
    try {
      if (!selectedItemId)
        return this.showNotification('Please select the snipet first!');

      this.setState({ loading: true });
      await deleteGist(selectedItemId);
      this.setState({ selectedItemId: null, editor: this.editorEmpty });
      this.fetchUserGists();
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
      this.showNotification('Something went wrong while contacting server');
      console.error(error);
    }
  };

  showNotification = msg => {
    this.setState({
      notificationActive: true,
      errorMsg: msg,
    });
    setTimeout(() => {
      this.setState({
        notificationActive: false,
      });
    }, 3000);
  };

  handleCheckboxChange = event => {
    this.setState({ publicChk: !this.state.publicChk });
  };

  handleAddFile = event => {
    const { editor } = this.state;
    this.setState({
      isAddingFile: true,
      editor: { id: '', name: '', desc: editor.desc, content: '' },
    });
  };

  handleFileSelect = event => {
    const selectedFile = event.target.value;
    const { selectedItemId } = this.state;
    this.setState({ fileSelectOption: selectedFile });

    this.populateEditor(selectedItemId, selectedFile);
  };

  renderingContext = () => {
    if (Storage.get('access_token')) {
      return (
        <div className={style.row}>
          {this.state.userGists && (
            <SnippetsList
              userGists={this.state.userGists}
              loadSnippets={this.loadSnippets}
              allGistsListed={this.state.allGistsListed}
              selectItem={this.selectItem}
              selectedItemId={this.state.selectedItemId}
            />
          )}
          {this.state.userGists && (
            <SnippetsEditor
              editor={this.state.editor}
              handleFormChange={this.handleFormChange}
              submitGist={this.submitGist}
              clearEditor={this.clearEditor}
              deleteGist={this.deleteGist}
              publicChk={this.state.publicChk}
              handleCheckboxChange={this.handleCheckboxChange}
              files={this.state.selectedItemFiles}
              handleAddFile={this.handleAddFile}
              handleFileSelect={this.handleFileSelect}
              fileSelectOption={this.state.fileSelectOption}
              isEmptyEditor={!this.state.selectedItemId}
              isAddingFile={this.state.isAddingFile}
              loading={this.state.loading}
            />
          )}
        </div>
      );
    } else if (this.props.fetchingToken) {
      return <div className={style['no-access']}>Loading , please wait...</div>;
    } else {
      return (
        <div className={style['no-access']}>
          Please login to access your snippets
        </div>
      );
    }
  };

  render() {
    return (
      <div className={style.app}>
        {this.state.loading && <Spinner />}
        {this.state.error && (
          <Notification
            message={this.state.errorMsg}
            active={this.state.notificationActive}
          />
        )}
        <Header
          loginLogic={this.loginLogic}
          logoutLogic={this.logoutLogic}
          fetchUserGists={this.fetchUserGists}
          profile={this.state.profile}
        />
        {this.renderingContext()}
      </div>
    );
  }
}

export default Home;
