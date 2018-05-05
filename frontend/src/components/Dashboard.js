import React, { Component } from 'react';
import {Redirect} from 'react-router';
// import AppliedUsers from './AppliedUsers';
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
      API.getMyPostedJobs(this.state.emailID).then((data) => {
        // console.log(data);
        if (data !== 404) {
            this.setState({jobs: data});
        } else {
          this.setState({error: data})
        }
      }).catch((err) => {
        this.setState({error: err});
      });
    } else {
      API.getMyAppliedJobs(this.state.emailID).then((response) => {
        // console.log(response);
        this.setState({jobs: response})
      }).catch((err) => {
        this.setState({error: err})
      });
      // this.setState({jobs: this.props.location.state.myjobs})
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

  renderEmployerDashboard(){
    return (
      // <div>
      //   <Navbar
      //     onSearch={this.handleIt}
      //     status={this.state.isLoggedIn}
      //     data={this.props.location.state}
      //     type={this.props.location.state.isEmployer}
      //     chooseTab={this.handleTabPage} />
      //   <h3>My Jobs</h3>
      //   {this.state.jobs.map((value, index) => (
      //     <a key={index} onClick={this.toggleView}>{value.designation}</a>
      //   ))}
      //   {/* {!this.state.isHidden && <AppliedUsers />} */}
      //   {this.state.isHidden ? null : <AppliedUsers />}
      // </div>
      <div className="container">
        <div className="navbar">
          <Navbar
            onSearch={this.handleIt}
            status={this.state.isLoggedIn}
            data={this.props.location.state}
            type={this.props.location.state.isEmployer}
            chooseTab={this.handleTabPage} />
        </div>

        {/* <div className="cover">

        </div> */}

        <div className="container dashboard-content">
          <div className="col-xs-12 panel panel-default text-center success-rate">
            <div className="panel-heading" id="success-rate-header">Your success rate</div>
            <div className="panel-body" id="show-success-rate"> %</div>
          </div>

          <div className="col-xs-12 panel panel-default col-md-6 applied-jobs gap">
            <div className="panel-heading text-center" >Jobs posted ({this.state.jobs.length})</div>
            <div className="panel-body text-center" id="posted-jobs-list">
              {this.state.jobs.length ?
                <table className="table table-bordered table-hover col-xs-12">
                  <thead>
                    <tr>
                      <th className="col-xs-4">Status</th>
                      <th className="col-xs-4">Job</th>
                      <th>Applicants</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.jobs.map((value, index) => (
                      <tr key={index}>
                        {value.status === 'Open' ? <td className="badge badge-success">Open</td> : <td className="badge badge-danger"></td> }
                        <td className="posted-job">{value.designation}</td>
                        {value.applied.length ? <td className="badge badge-success">{value.applied.length}</td> : <td className="badge badge-info">0</td> }
                      </tr>
                    ))}
                  </tbody>
                </table> : null
              }
                {/* {this.state.jobs.map((value, index) => (
                  <div key={index} className="row applied-job">
                    {value.status === 'Open' ? <p className="col-xs-2 badge badge-success">Open</p> : <p className="col-xs-2 badge badge-danger"></p> }
                    <p className="col-xs-8">{value.designation}</p>
                    {value.applied.length ? <p className="col-xs-1 badge badge-success">{value.applied.length}</p> : <p className="col-xs-1 badge badge-info">0</p> }
                  </div>
                ))} : <p className="alert alert-info"><i className="fa fa-info-circle" /> You have not posted a job yet</p> } */}

            </div>
          </div>

          <div className="col-xs-12 panel panel-default col-md-6 profile-views gap">
            <div className="panel-heading text-center">Profile views</div>
            <div className="panel-body text-center">To be added</div>
          </div>

          <div id="rejects">

          </div>

          <div id="success-rate">

          </div>
        </div>
      </div>
    )
  }


  render() {
    // console.log(this.state.jobs);
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
    if (this.state.jobs && !this.state.error && this.state.isEmployer) {
      return this.renderEmployerDashboard();
    } else if (this.state.error) {
      return (
        <div>
          <Navbar
            onSearch={this.handleIt}
            status={this.state.isLoggedIn}
            data={this.props.location.state}
            type={this.props.location.state.isEmployer}
            chooseTab={this.handleTabPage} />
            <h3>No jobs posted yet</h3>
        </div>
      );
    } else if (this.state.jobs && !this.state.error && !this.state.isEmployer) {
      let applied = this.state.jobs.length;
      let accepted = 0;
      this.state.jobs.map((value, index) => {
        if (value.status === 'Accepted') {
          accepted += 1;
        }
      });

      let success_rate = parseInt((accepted / applied) * 100);
      // console.log(applied);
      // document.getElementById("data").innerHTML = success_rate;

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
            <div className="col-xs-12 panel panel-default text-center success-rate">
              <div className="panel-heading" id="success-rate-header">Your success rate</div>
              <div className="panel-body" id="show-success-rate">{success_rate} %</div>
            </div>

            <div className="col-xs-12 panel panel-default col-md-6 applied-jobs gap">
              <div className="panel-heading text-center" >Jobs applied</div>
              <div className="panel-body text-center" id="jobs-list">
                {this.state.jobs.map((value, index) => (
                  <div key={index} className="row">
                    <p className="col-xs-8 col-md-8">{value.job} - {value.company}</p>
                    {value.status === 'Pending' ? <p className="col-xs-3 badge badge-info">{value.status}</p> : null }
                    {value.status === 'Accepted' ? <p className="col-xs-3 badge badge-success">{value.status}</p> : null }
                    {value.status === 'Rejected' ? <p className="col-xs-3 badge badge-danger">{value.status}</p> : null }
                  </div>
                ))}
              </div>
            </div>

            <div className="col-xs-12 panel panel-default col-md-6 profile-views gap">
              <div className="panel-heading text-center">Profile views</div>
              <div className="panel-body text-center">To be added</div>
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
