import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
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
      open: false,
      error: ''
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.handleTabPage = this.handleTabPage.bind(this);
    this.handleCompanySize = this.handleCompanySize.bind(this);
    this.handleViewJob = this.handleViewJob.bind(this);
  }

  componentWillMount(){
    // console.log(this.props);
    // console.log(this.state.jobs);
    API.getAllJobs().then((docs) => {
      this.setState({jobs: docs})
    }).catch((err) => {
      this.setState({error: err});
    });
  }

  handleSearch(string) {
    // console.log(string);
    // this.props.onSearch(string, 'jobs');
    API.getAllSearchedJobs(string).then((data) => {
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
    let profile = this.props.location.state.firstname.toLowerCase() + this.props.location.state.lastname.toLowerCase();
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

  handleViewJob(event, job) {
    event.preventDefault();
    // console.log(job);

  }



  handleCompanySize(company, callback) {
    // API.getCompanySize(company);
    API.getCompanySize(company).then((response) => {
      return callback(response.size);
      // console.log(response);
    }).catch((err) => {
      this.setState({error: err})
    });
  }

  renderJobs() {
    return (
      <div className="col-xs-12">
        {this.state.jobs.map((value, index) => (
          <div key={index} className="row each-job">
            <div className="col-xs-12 header">
              <div className="col-xs-4 col-md-1 img">Image</div>
              <div className="col-xs-8 col-md-10 post"><p>{value.designation} <Link to={{pathname: '/applyjob', state: {data: this.props.location.state, job: value}}} className="view-job" >View job <i className="fa fa fa-share-square-o" /></Link></p></div>
              {/* <div className="col-xs-8 col-md-5 post"><p>{value.designation}</p></div><div className="col-xs-8 col-xs-offset-4 col-md-2 col-md-offset-0 view-job">Hello</div> */}
              <div className="col-xs-8 col-xs-offset-4 col-md-10 col-md-offset-1 small-desc">Small Description to explain about the company</div>
            </div>
            <div className="col-xs-12 description">
              <div className="col-xs-8 col-xs-offset-4 col-md-10 col-md-offset-1">{value.company} - {value.location}</div>
              <div className="col-xs-12">&nbsp;</div>
              <div className="col-xs-11 col-md-offset-1 col-md-3 col-xs-offset-4"><i className="fa fa-check" /> {value.status}</div>
              <div className="col-xs-11 col-md-offset-0 col-md-3 col-xs-offset-4"><i className="fa fa-paw" /> {value.applied.length} applicants</div>
              <div className="col-xs-11 col-md-offset-0 col-md-3 col-xs-offset-4"><i className="fa fa-users" /> <i>Test</i> employees</div>
            </div>
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
        <div className="container">
          <div className="navbar">
            <Navbar
              onSearch={this.handleIt}
              status={this.state.isLoggedIn}
              data={this.props.location.state}
              chooseTab={this.handleTabPage} />
          </div>

          {/* <br /> */}
          <div className="text-center">
            <h3>Over 1500+ jobs open. Apply now.</h3>
          </div>

          <div className="container job-content">
            <div className="col-12 search">
                <SearchBox onSearch={this.handleSearch}/>
            </div>
            <br /><br />
            <div className="col-xs-12 joblist-content">
              {this.state.jobs.length ? this.renderJobs() : null}
            </div>

          </div>
        </div>
      )
    }
  }
}


export default JobsPage;
