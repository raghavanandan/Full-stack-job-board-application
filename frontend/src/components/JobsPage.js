import React, { Component } from 'react';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import SearchBox from './SearchBox';
import * as API from '../api/API';

class JobsPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: this.props.location.state.isLoggedIn,
      redirect: false,
      jobs: [],
      error: ''
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.handleTabPage = this.handleTabPage.bind(this);
  }

  componentWillMount(){
    // console.log(this.props);
    // console.log(this.state.jobs);
    // API.getAllCompanies();
  }

  handleSearch(string) {
    // console.log(string);
    // this.props.onSearch(string, 'jobs');
    API.getAllJobs(string).then((data) => {
      if (data !== 404) {
        // console.log(data[0].postedBy[0].name);
        this.setState({jobs: data});
      }
    }).catch((err) => {
      this.setState({error: err});
      console.log(err);
    })
  }

  handleTabPage(tab) {
    // console.log(tab);
    let profile = this.props.location.state.firstname;
    // console.log(profile);
    tab = tab.toLowerCase();
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

  renderJobs() {
    return (
      <div>
        {this.state.jobs.map((value, index) => (
          <div key={index}>
            <p>Job: {value.designation}</p>
            <p>Posted By: {value.postedBy[0].name}</p>
            <p>Posted on: {value.postedOn}</p>
          </div>
        ))}
      </div>
    )
  }

  render(){
    if (this.state.redirect) {
      return <Redirect to="/" />
    } else {
      return (
        <div>
          <Navbar
            onSearch={this.handleIt}
            status={this.state.isLoggedIn}
            data={this.props.location.state}
            chooseTab={this.handleTabPage} />
          <SearchBox onSearch={this.handleSearch}/>
          {this.state.jobs.length ? this.renderJobs() : null}
        </div>
      )
    }
  }
}


export default JobsPage;
