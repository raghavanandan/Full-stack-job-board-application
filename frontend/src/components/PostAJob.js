import React, { Component } from 'react';
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
      emailID: this.props.location.state.email
    }

    this.handlePost = this.handlePost.bind(this);
  }

  componentDidMount() {
    // console.log(this.state);
    // console.log('PostAJob state', this.props.location.state);
  }

  handlePost(event) {
    event.preventDefault();
    // this.setState({status: 'Open'});
    var flag = 0;
    for(var key in this.state) {
      if (this.state[key]) {
        flag+=1;
        // console.log(flag);
      }
    }
    if (flag === 10) {
      this.setState({status: 'Open'}, () => {
        // console.log(this.state);
        API.postJob(this.state).then((data) => {
          if (data === 200) {
            // console.log('Got data back');
            this.props.history.push({
              pathname: `/myjobs`,
              state: this.state
            })
          }
        }).catch((err) => {
          console.log(err);
        });
      });

    }

  }

  render() {
    return (
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
      </div>
    )
  }
}

export default PostAJob;
