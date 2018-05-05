import React, { Component } from 'react';
import Navbar from './Navbar';
import * as API from '../api/API';

class Recruit extends Component {
  constructor(props){
    super(props);
    this.state = this.props.location.state;
    this.state.jobs = [];

    this.handleTabPage = this.handleTabPage.bind(this);
  }

  componentWillMount() {
    // console.log(this.state);

    API.getMyPostedJobs(this.state.email).then((data) => {
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


  render(){
    return (
      <div className="container">
        <div className="navbar">
          <Navbar
            onSearch={this.handleIt}
            status={this.state.isLoggedIn}
            data={this.props.location.state}
            type={this.props.location.state.isEmployer}
            chooseTab={this.handleTabPage} />
        </div>
      </div>
    )
  }
}


export default Recruit;
