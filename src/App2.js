import React, { Component } from 'react';
// import axios from './util/axiosConfig';
import Header from './components/Header/Header';
import SnippetsList from './components/SnippetsList/SnippetsList';
import SnippetsEditor from './components/SnippetsEditor/SnippetsEditor';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import style from './App.module.scss';
import Storage from './util/storage/storage';
import { initiateLogin, sendCode } from './services/api/login';
import {
  getUserGists,
  getSingleGist,
  editGist,
  createGist,
  deleteGist,
} from './services/api/gists';
import { getUserInfo } from './services/api/users';
import getQueryVariable from './util/getQueryVariable';
import Spinner from './components/Spinner/Spinner';
import Notification from './components/Notification/Notification';

window.onload = async function(event) {
  const code = getQueryVariable('code');

  if (code) {
    const { data } = await sendCode(code);
    window.location.href = 'http://localhost:3000/';

    if (data.includes('access_token')) {
      const token = data.substring(data.indexOf('=') + 1, data.indexOf('&'));
      Storage.set('access_token', token);
    }
  }
};

class App extends Component {
  state = {
    userGists: null,
    pageNumber: 1,
    editor: {
      id: '',
      name: '',
      desc: '',
      content: '',
    },
    allGistsListed: false,
    profile: null,
    loading: false,
    selectedItemId: null,
    selectedItem: null,
    publicChk: true,
    error: true,
    errorMsg: '',
    notificationActive: false,
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

  loginLogic = async () => {
    initiateLogin();
  };

  logoutLogic = async () => {
    Storage.remove('access_token');
    this.setState({ profile: null });
    this.forceUpdate();
  };

  selectItem = id => {
    this.setState({ selectedItemId: id });
    this.populateEditor(id);
  };

  populateEditor = async id => {
    try {
      this.setState({ loading: true });
      const { data } = await getSingleGist(id);
      const fileName = Object.keys(data.files)[0];

      this.setState({ selectedItem: data.files[fileName] });

      const editor = {
        id: data.id,
        name: fileName,
        desc: data.description,
        content: data.files[fileName].content,
      };

      this.setState({ editor });
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
      this.showNotification('Snippet could not be loaded');
      console.error(error);
    }
  };

  submitGist = async event => {
    event.preventDefault();
    const { editor, selectedItemId, publicChk } = this.state;

    const files = {
      [editor.name]: {
        content: editor.content,
        filename: editor.name,
      },
    };

    try {
      if (!selectedItemId) {
        //create gist
        //////////////////////////////
        if (!selectedItemId)
          return this.showNotification(
            'Please enter the data or select existing snippet'
          );

        this.setState({ loading: true });
        await createGist(files, editor.desc, publicChk);

        this.fetchUserGists();
        this.setState({ selectedItemId: null, editor: this.editorEmpty });
        this.setState({ loading: false });
      } else {
        //edit gist
        ///////////////////////////////

        this.setState({ loading: true });
        await editGist(selectedItemId, files, editor.desc);
        this.fetchUserGists();
        this.setState({ loading: false });
      }
    } catch (error) {
      this.setState({ loading: false });
      this.showNotification('Something went wrong while contacting server');
      console.error(error);
    }
  };

  createNewGist = event => {
    event.preventDefault();
    this.setState({ selectedItemId: null, editor: this.editorEmpty });
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
        // errorMsg: '',
      });
    }, 3000);
  };

  handleCheckboxChange = event => {
    this.setState({ publicChk: !this.state.publicChk });
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
        {Storage.get('access_token') ? (
          <div className={style.row}>
            {this.state.userGists && (
              <SnippetsList
                userGists={this.state.userGists}
                loadSnippets={this.loadSnippets}
                allGistsListed={this.state.allGistsListed}
                selectItem={this.selectItem}
              />
            )}
            {this.state.userGists && (
              <SnippetsEditor
                editor={this.state.editor}
                handleFormChange={this.handleFormChange}
                submitGist={this.submitGist}
                createNewGist={this.createNewGist}
                deleteGist={this.deleteGist}
                publicChk={this.state.publicChk}
                handleCheckboxChange={this.handleCheckboxChange}
              />
            )}
          </div>
        ) : (
          <div className={style['no-access']}>
            Please login to access your snippets
          </div>
        )}
      </div>
    );
  }
}

export default App;
