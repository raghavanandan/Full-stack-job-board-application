import React, { Component } from 'react';
import Navbar from './Navbar';
import * as API from '../api/API';

class PostAJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: this.props.location.state.company,
      jobID: '',
      designation: '',
      description: '',
      responsibilities: '',
      postedBy: this.props.location.state.firstname + ' ' + this.props.location.state.lastname,
      location: '',
      requirements: '',
      type: 'Technology',
      status: '',
      emailID: this.props.location.state.email,
      isLoggedIn: this.props.location.state.isLoggedIn,
      error: ''
    }

    this.handlePost = this.handlePost.bind(this);
    this.handleTabPage = this.handleTabPage.bind(this);
  }

  componentDidMount() {
    // console.log(this.state);
    // console.log('PostAJob state', this.props.location.state);
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

  handlePost(event) {
    event.preventDefault();
    // console.log(this.state);
    let {jobID, company, description, designation, emailID, location, postedBy, requirements, responsibilities, type} = this.state;
    if (jobID && company && description && designation && emailID && location && postedBy && requirements && responsibilities && type) {
      // console.log(this.state);
      this.setState({status: 'Open'}, () => {
        let {status} = this.state;
        var job = {jobID, company, description, designation, emailID, location, postedBy, requirements, responsibilities, status, type}
        API.postJob(job).then((response) => {
          if (response === 200) {
            this.props.history.push({
              pathname: `/dashboard`,
              state: this.props.location.state
            })
          } else {
            this.setState({error: 'Unable to post at the moment.'})
          }
        }).catch((err) => {
          this.setState({error: 'Refresh the page and try posting again.'});
        })
      })
    } else {
      this.setState({error: 'You need to give more details of the job.'});
    }
  }

  render() {
    return (
      <div>
        <Navbar
          onSearch={this.handleIt}
          status={this.state.isLoggedIn}
          data={this.props.location.state}
          chooseTab={this.handleTabPage} />
          <div>
            <h2>Post a Job</h2>
            <form onSubmit={this.handlePost}>
              <label>
                Company: <input
                  type="text"
                  value={this.state.company}
                  disabled
                />
              </label><br />
              <label>
                Job ID: <input
                  type="text"
                  value={this.state.jobID}
                  onChange={(event) => this.setState({jobID: event.target.value})}
                />
              </label><br />
              <label>
                Job Position: <input
                  type="text"
                  value={this.state.designation}
                  onChange={(event) => this.setState({designation: event.target.value})}
                />
              </label><br />
              <label>
                Description: <textarea
                  rows="5"
                  columns="10"
                  value={this.state.description}
                  onChange={(event) => this.setState({description: event.target.value})}
                />
              </label><br />
              <label>
                Responsibilities: <textarea
                  rows="5"
                  columns="10"
                  value={this.state.responsibilites}
                  onChange={(event) => this.setState({responsibilities: event.target.value})}
                />
              </label><br />
              <label>
                Location: <input
                  type="text"
                  value={this.state.location}
                  onChange={(event) => this.setState({location: event.target.value})}
                />
              </label><br />
              <label>
                Requirements: <textarea
                  rows="5"
                  columns="10"
                  value={this.state.requirements}
                  onChange={(event) => this.setState({requirements: event.target.value})}
                />
              </label><br />
              <label>
                Type: <select value={this.state.type} onChange={(event) => this.setState({type: event.target.value})}>
                  <option value="Technology">Technology</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Funding">Funding</option>
                </select>
              </label><br />
              <button type="submit">Post</button>
            </form>
            {this.state.error}
          </div>
      </div>
    )
  }
}

export default PostAJob;
