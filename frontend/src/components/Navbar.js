import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
// import SearchBox from './SearchBox';
// import * as API from '../api/API';

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: '',
      type: 'jobs',
      isLoggedIn: false,
      isEmployer: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTabs = this.handleTabs.bind(this);
  }

  componentWillMount(){
    // console.log(this.props);
    this.setState({isLoggedIn: this.props.status});
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log(this.state);
    if (this.state.search) {
      this.props.onSearch({search: this.state.search, type: this.state.type});
    } else {
      return;
    }

    // this.props.onSearch({search: string, type: this.state.type});
  }

  handleTabs(tab) {
    // console.log(tab);
    this.props.chooseTab(tab);
  }

  renderLogoutMenu(){
    return (
      <nav>
        <div>
          <button>Join</button>
          <button>Login</button>
        </div>
      </nav>
    )
  }

  renderLoginMenu(){
    return (
      <nav>
        <div>
          <a onClick={() => this.handleTabs('profile')}>Profile</a>&nbsp;
          <a onClick={() => this.handleTabs('dashboard')}>Dashboard</a>&nbsp;
          <a onClick={() => this.handleTabs('recruit')}>Recruit</a>&nbsp;
          <a onClick={() => this.handleTabs('jobs')}>Jobs</a>&nbsp;
          <a onClick={() => this.handleTabs('companies')}>Companies</a>&nbsp;
          <a onClick={() => this.handleTabs('logout')}>Logout</a>&nbsp;
            {/* <input type='search' onChange={(event) => this.setState({search: event.target.value})} />
            <select value={this.state.type} onChange={(event) => this.setState({type: event.target.value})}>
              <option value="jobs">Jobs</option>
              <option value="companies">Companies</option>
            </select>
            <button onClick={this.handleSubmit}>Search</button> */}
        </div>
      </nav>

    )
  }

  render() {
    if (this.state.isLoggedIn) {
      return this.renderLoginMenu();
    } else {
      return this.renderLogoutMenu();
    }
  }
}


export default Navbar;
