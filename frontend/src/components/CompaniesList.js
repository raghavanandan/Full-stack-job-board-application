import React, {Component} from 'react';
import {Redirect} from 'react-router';
import Navbar from './Navbar';
import SearchBox from './SearchBox';
import * as API from '../api/API';

class CompaniesList extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: this.props.location.state.isLoggedIn,
      redirect: false,
      companies: [],
      error: '',
      searchCompany: {},
      isHidden: true
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.handleTabPage = this.handleTabPage.bind(this);
  }

  componentWillMount() {
    // console.log(this.state.companies);
    // console.log(this.props.location.state);
    API.getAllCompanies().then((data) => {
      // console.log(data);
      this.setState({companies: data});
    });
  }

  handleSearch(company) {
    // console.log(string);
    company = company.charAt(0).toUpperCase() + company.slice(1).toLowerCase();
    this.props.location.state.search = company;
    API.getCompany(company).then((data) => {
        this.props.history.push({
          pathname: `/companies/${company}`,
          state: this.props.location.state
        });
        // this.setState({searchCompany: data}, () => console.log(this.state.companies));
        // console.log(data);
    }).catch((err) => {
      this.setState({error: err});
      console.log('Unable to find the company', err);
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

  gotoCompany(company) {
    // console.log(company);
    this.props.location.state.search = company;

    this.props.history.push({
      pathname: `/companies/${company}`,
      state: this.props.location.state
    });
  }

  renderSearchCompany() {
    return (
      <div>
        <p>Company: {this.state.searchCompany.name}</p>
        <p>About: {this.state.searchCompany.about}</p>
      </div>
    )
  }

  renderCompanies() {
    return (
      <div>
        {this.state.companies.map((value, index) => (
          <div key={index}>
            <a onClick={() => this.gotoCompany(value.name)}>Company: {value.name}</a>

            {/* <p>About: {value.about}</p>
            <p>CEO: {value.ceo}</p>
            <p>Type: {value.type}</p> */}
            <hr />
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
          {/* {this.state.companies.length ? this.renderCompanies() : null} */}
          {Object.keys(this.state.searchCompany).length ? this.renderSearchCompany() : this.renderCompanies()}
        </div>
      )
    }
  }
}

export default CompaniesList;
