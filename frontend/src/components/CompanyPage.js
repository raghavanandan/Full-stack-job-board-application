import React, { Component } from 'react';
import Navbar from './Navbar';
import {Redirect} from 'react-router';
// import { Route } from 'react-router-dom';
// import Overview from './Overview';
// import axios from 'axios';
// import SearchBox from './SearchBox';
import * as API from '../api/API';


class CompanyPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      company: '',
      about: '',
      type: '',
      founder: '',
      ceo: '',
      jobs: [],
      reviews: [],
      section: 'overview',
      job: '',
      status: '',
      title: '',
      pros: '',
      cons: '',
      benefits: '',
      salary: '',
      rating: '',
      redirect: false,
      isValid: false,
      isLoggedIn: false
    }

    this.handleSections = this.handleSections.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTabPage = this.handleTabPage.bind(this);
  }

  componentWillMount() {
    // console.log(this.props.location.state);
    // console.log(this.props);
    let company;
    if (this.props.location.state) {
      company = this.props.location.state.search;
      this.setState({company, isLoggedIn: this.props.location.state.isLoggedIn});
    } else {
      company = this.props.match.params.name;
      this.setState({company});
    }
    // console.log(this.state.company);

    API.getCompany(company).then((data) => {
      console.log(data);
      if (data !== 400) {
        this.setState({
          about: data.about,
          type: data.type,
          founder: data.founder,
          ceo: data.ceo,
          reviews: data.reviews,
          isValid: true
        });
      } else {
        this.setState({isValid: false});
      }
    }).catch((err) => {
      // console.log(err);
      this.setState({isValid: false});
    })

    API.getCompanyJobs(company).then((data) => {
      if (data !== 400) {
        this.setState({jobs: data, isValid: true});
      } else {
        this.setState({isValid: false});
      }
    }).catch((err) => {
      // console.log(err);
      this.setState({isValid: false});
    })

  }

  handleTabPage(tab) {
    // console.log('In profile', tab);
    let profile = this.props.location.state.firstname;
    // console.log(profile,tab);
    // tab = tab.toLowerCase();
    // // console.log(tab);
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

  handleSections(section) {
    // console.log(section);
    // let company = this.state.company;
    if (section === 'overview') {
      this.setState({section: 'overview'});
    } else if (section === 'jobs') {
      this.setState({section: 'jobs'});
    } else if (section === 'reviews') {
      this.setState({section: 'reviews'});
    } else if (section === 'writereview') {
      this.setState({section: 'writereview'});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log(this.state);
    let data = {
      job: this.state.job,
      status: this.state.status,
      title: this.state.title,
      pros: this.state.pros,
      cons: this.state.cons,
      benefits: this.state.benefits,
      salary: this.state.salary,
      rating: this.state.rating
    }

    API.postReview(this.state.company, data).then((res) => {
      if (res === 200) {
        this.setState({section: 'reviews'});
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  renderOverview() {
    return (
      <div>
        <h3>About: </h3>
        <p>{this.state.about}</p>
        <h3>Company type:</h3>
        <p>{this.state.type}</p>
        <h3>Founder(s):</h3>
        <p>{this.state.founder}</p>
        <h3>CEO:</h3>
        <p>{this.state.ceo}</p>
      </div>
    )
  }

  renderJobs() {
    if (!this.state.jobs.length) {
      return <h3>No jobs available now</h3>
    } else {
      return (
        <div>
          <h3>Jobs open in {this.state.company}</h3>
          {this.state.jobs.map((value, index) => (
            <div key={index}>
              <p>Job: {value.designation}</p>
              <p>Status: {value.status}</p>
              <p>Posted by: {value.postedBy[0].name}</p>
              <p>Posted on: {value.postedOn}</p>
              <p>Minimum requirements: {value.requirements}</p>
              <p>Job Type: {value.type}</p>
              <hr />
            </div>
          ))}
        </div>
      )
    }
  }

  renderReviews() {
    return (
      <div>
        <h3>Reviews for {this.state.company}</h3>
        {this.state.reviews.map((value, index) => (
          <div key={index}>
            <h4>Review {index+1}</h4>
            <p>Job: {value.job}</p>
            <p>Status: {value.status}</p>
            <p>Title: {value.title}</p>
            <p>Pros: {value.pros}</p>
            <p>Cons: {value.cons}</p>
            <p>Benefits: {value.benefits}</p>
            <p>Salary: {value.salary}</p>
            <p>Rating: {value.rating}</p>
            <p>Posted on: {value.postedOn}</p>
            <hr />
          </div>
        ))}
      </div>
    )
  }

  renderWriteReview() {
    return (
      <div>
        <h1>Post a review for {this.state.company}</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Designation:
            <input
              type="text"
              name="job"
              value={this.state.job}
              onChange={(event) => this.setState({job: event.target.value})}
            />
          </label><br/>
          <label>
            Job status:
            <input
              type="text"
              name="status"
              value={this.state.status}
              onChange={(event) => this.setState({status: event.target.value})}
            />
          </label><br/>
          <label>
            Review Title: <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={(event) => this.setState({title: event.target.value})}
            />
          </label><br/>
          <label>
            Pros: <input
              type="text"
              name="pros"
              value={this.state.pros}
              onChange={(event) => this.setState({pros: event.target.value})}
            />
          </label><br/>
          <label>
            Cons: <input
              type="text"
              name="cons"
              value={this.state.cons}
              onChange={(event) => this.setState({cons: event.target.value})}
            />
          </label><br/>
          <label>
            Benefits: <input
              type="text"
              name="benefits"
              value={this.state.benefits}
              onChange={(event) => this.setState({benefits: event.target.value})}
            />
          </label><br/>
          <label>
            Salary: <input
              type="text"
              name="salary"
              value={this.state.salary}
              onChange={(event) => this.setState({salary: event.target.value})}
            />
          </label><br/>
          <label>
            Rating: <input
              type="text"
              name="rating"
              value={this.state.rating}
              onChange={(event) => this.setState({rating: event.target.value})}
            />
          </label><br/><br/>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    )
  }

  renderCompany() {
    let company = this.state.company;
    // console.log(this.state);
    return (
      <div>
        <Navbar
          onSearch={this.handleIt}
          status={this.state.isLoggedIn}
          data={this.props.location.state}
          chooseTab={this.handleTabPage} />
        <h1>{company}</h1>
        <hr />


        {/* <button onClick={() =>
          this.props.history.push({
            pathname: `/companies/${company}`,
            state: this.props.location.state
          })
        }>Overview</button> */}


        {/* <button onClick={() => this.props.history.push({
          pathname: `/companies/${company}/postings`,
          state: this.props.location.state
        })}>Jobs</button> */}


        {/* <button onClick={() => this.props.history.push({
          pathname: `/companies/${company}/reviews`,
          state: this.props.location.state
        })}>Reviews</button>

        <button onClick={() => this.props.history.push({
          pathname: `/companies/${company}/writereview`,
          state: this.props.location.state
        })}>Write a review</button> */}

        <button onClick={() => this.handleSections('overview')}>Overview</button>
        <button onClick={() => this.handleSections('jobs')}>Jobs</button>
        <button onClick={() => this.handleSections('reviews')}>Reviews</button>
        <button onClick={() => this.handleSections('writereview')}>Write a Review</button>

        {this.state.section === 'overview' ? this.renderOverview() : null}
        {this.state.section === 'jobs' ? this.renderJobs() : null}
        {this.state.section === 'reviews' ? this.renderReviews() : null}
        {this.state.section === 'writereview' ? this.renderWriteReview() : null}
      </div>
    )
  }


  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }

    if (this.state.isValid === true) {
      return this.renderCompany();
    } else {
      return (
        <h1>No such page exists</h1>
      )
    }
  }
}

export default CompanyPage;
