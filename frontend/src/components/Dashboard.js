import React, { Component } from 'react';
import {Redirect} from 'react-router';
import AppliedUsers from './AppliedUsers';
import Navbar from './Navbar';
import * as API from '../api/API';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      emailID: this.props.location.state.email,
      jobs: [],
      error: '',
      isHidden: true,
      isEmployer: this.props.location.state.isEmployer,
      isLoggedIn: this.props.location.state.isLoggedIn,
      redirect: false
    }
    this.toggleView = this.toggleView.bind(this);
    this.handleTabPage = this.handleTabPage.bind(this);
  }

  componentWillMount(){
    // console.log(this.props.location.state);
    // this.setState({isHidden: false});
    // console.log(this.state);
    if (this.state.isEmployer) {
      API.getPostedJobs(this.state.emailID).then((data) => {
        // console.log(data);
        if (data !== 404) {
            this.setState({jobs: data});
        } else {
          this.setState({error: data})
        }
      }).catch((err) => {
        this.setState({error: err});
      });
    }

  }

  toggleView() {
    this.setState(prevState => ({
      isHidden: !prevState.isHidden
    }));
  }

  handleTabPage(tab) {
    // console.log('In profile', tab);
    let profile = this.props.location.state.firstname.toLowerCase() + this.props.location.state.lastname.toLowerCase();
    // tab = tab.toLowerCase();
    // console.log(tab);
    if (tab === 'logout') {
      API.logout(this.props.location.state.tokens[0]).then((response) => {
        if (response === 200) {
          this.setState({redirect: true});
        }
      }).catch((err) => {
        console.log(err);
      })
    } else if (tab === 'profile') {
      this.props.history.push({
        pathname: `/in/${profile}`,
        state: this.props.location.state
      })
    } else {
      this.props.history.push({
        pathname: `/${tab}`,
        state: this.props.location.state
      })
    }
  }

  renderPostedJobs(){
    return (
      <div>
        <Navbar
          onSearch={this.handleIt}
          status={this.state.isLoggedIn}
          data={this.props.location.state}
          chooseTab={this.handleTabPage} />
        <h3>My Jobs</h3>
        {this.state.jobs.map((value, index) => (
          <a key={index} onClick={this.toggleView}>{value.designation}</a>
        ))}
        {/* {!this.state.isHidden && <AppliedUsers />} */}
        {this.state.isHidden ? null : <AppliedUsers />}
      </div>
    )
  }


  render() {
    // console.log(this.state.jobs);
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
    if (this.state.jobs && !this.state.error && this.state.isEmployer) {
      return this.renderPostedJobs();
    } else if (this.state.error) {
      return (
        <div>
          <Navbar
            onSearch={this.handleIt}
            status={this.state.isLoggedIn}
            data={this.props.location.state}
            chooseTab={this.handleTabPage} />
            <h3>No jobs posted yet</h3>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="navbar">
            <Navbar
              onSearch={this.handleIt}
              status={this.state.isLoggedIn}
              data={this.props.location.state}
              chooseTab={this.handleTabPage} />
          </div>

          {/* <div className="cover">

          </div> */}

          <div className="container dashboard-content">
            <div id="applied-jobs">

            </div>

            <div id="offers">

            </div>

            <div id="rejects">

            </div>

            <div id="success-rate">

            </div>
          </div>
        </div>
      )
    }
  }
}

export default Dashboard;
