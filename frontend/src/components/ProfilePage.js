import React, { Component } from 'react';
import Navbar from './Navbar';
import {Redirect} from 'react-router';
import * as API from '../api/API';

class ProfilePage extends Component {
  constructor(props){
    super(props);
    // this.state = this.props.location.state || {redirect: false, search: ''};
    // this.state = {
    //   redirect: false,
    //   isLoggedIn: true
    // };
    // if (this.props.location.state) {
    //   this.state = this.props.location.state;
    // } else {
    //   this.state = {}
    // }
    // this.state.redirect = false;
    this.state = this.props.location.state;
    this.state.redirect = false;

    // this.login = this.login.bind(this);
    this.handleIt = this.handleIt.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleTabPage = this.handleTabPage.bind(this);
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
  }

  componentDidMount() {
    // console.log('Profilepage Component Mounted');
    // console.log(this.props.location.state);
    // console.log(this.state);
    // console.log(this.props);
  }

  handleIt(string) {
    // console.log('HandleIt');
    this.props.onSearch(string);
    // this.setState({redirect: 'companies', search: string})
  }

  handleLogout(event) {
    event.preventDefault();
    // console.log(this.state.email);
    API.logout(this.state.tokens[0]).then((response) => {
      if (response === 200) {
        this.setState({redirect: true});
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  handleTabPage(tab) {
    // console.log('In profile', tab);
    let profile = this.state.firstname;
    tab = tab.toLowerCase();
    // console.log(tab);
    if (tab === 'logout') {
      API.logout(this.state.tokens[0]).then((response) => {
        if (response === 200) {
          this.setState({redirect: true});
        }
      }).catch((err) => {
        console.log(err);
      })
    } else if (tab === 'profile') {
      this.props.history.push({
        pathname: `/in/${profile}`,
        state: this.state
      })
    } else {
      this.props.history.push({
        pathname: `/${tab}`,
        state: this.state
      })
    }
  }

  handleUpdateProfile() {
    // console.log(this.state);
    let id = this.props.location.state._id;
    let userProfile = {
      company: this.state.company,
      designation: this.state.designation,
      email: this.state.email,
      firstname: this.state.firstname,
      lastname: this.state.lastname
    }

    API.updateProfile(userProfile, id).then((updatedProfile) => {
      // console.log(updatedProfile);
      this.setState({
        company: updatedProfile.company,
        designation: updatedProfile.designation,
        email: updatedProfile.email,
        firstname: updatedProfile.firstname,
        lastname: updatedProfile.lastname
      });
    }).catch((err) => {
      console.log(err);
    })
  }

  renderJobSeekerProfile() {
    return (
      <div>
        {/* <SearchBox onSearch={this.handleIt}/> */}
        <h1>Welcome {this.state.firstname}</h1>
      </div>
    )
  }

  renderEmployerProfile() {
    // let profile = this.state.firstname;
    return (
      <div>
        <Navbar
          onSearch={this.handleIt}
          status={this.state.isLoggedIn}
          data={this.props.location.state}
          chooseTab={this.handleTabPage} />
        <h1>Welcome Mr.{this.state.firstname}</h1>
        <p>{this.state.joined}</p>
        <hr /><br />
        <label>Firstname: </label><input
          type='text'
          value={this.state.firstname}
          onChange={(event) => this.setState({firstname: event.target.value})}
          contentEditable /><br />
        <label>Lastname: </label><input
          type='text'
          value={this.state.lastname}
          onChange={(event) => this.setState({lastname: event.target.value})}
          contentEditable /><br />
        <label>Email ID: </label><input
          type='email'
          value={this.state.email}
          onChange={(event) => this.setState({email: event.target.value})}
          contentEditable /><br />
        <label>Company: </label><input
          type='text'
          value={this.state.company}
          onChange={(event) => this.setState({company: event.target.value})}
          contentEditable /><br />
        <label>Designation: </label><input
          type='text'
          value={this.state.designation}
          onChange={(event) => this.setState({designation: event.target.value})}
          contentEditable /><br /><br />
        <button type='submit' onClick={this.handleUpdateProfile}>Save</button>
        {/* <button onClick={() => this.props.history.push({
          pathname: `/user/${profile}`,
          state: this.state
        })}>Profile</button>
        <button onClick={() => this.props.history.push({
          pathname: `/user/${profile}/dashboard`,
          state: this.state
        })}>Dashboard</button>
        <button onClick={() => this.props.history.push({
          pathname: `/user/${profile}/postajob`,
          state: this.state
        })}>Post a job</button>
        <button onClick={this.handleLogout}>Logout</button> */}
      </div>
    )
  }


  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }

    if (!this.state || !this.state.isLoggedIn) {
      return (
        <div>
          <p>Please <button onClick={this.setState({redirect: true})}>login</button> to continue</p>
        </div>
      )
    } else {
      if(!this.state.isEmployer) {
        return this.renderJobSeekerProfile();
      } else {
        return this.renderEmployerProfile();
      }
    }
  }
}



export default ProfilePage;
