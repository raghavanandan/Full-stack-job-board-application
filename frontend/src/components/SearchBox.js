import React, { Component } from 'react';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
      // type: 'jobs'
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    // console.log('In search box', this.props);

  }

  comnponentWillMount() {
    // console.log('Search Page');
    // console.log(this.props);
  }

  componentDidMount() {
    // console.log('Search component mounted');
    // console.log(this.props);
  }

  render() {
    return (
      <div>
        {/* <form onSubmit={this.handleSubmit}> */}
          <input type='search' onChange={(event) => this.setState({search: event.target.value})} />
          <button onClick={this.handleSubmit}>Search</button>
          {/* <select value={this.state.type} onChange={(event) => this.setState({type: event.target.value})}>
            <option value="jobs">Jobs</option>
            <option value="companies">Companies</option>
          </select>
          <input type='submit' value='Search' /> */}
        {/* </form> */}
      </div>
    )
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log('After submit start', this.state);
    let string = this.state.search;
    // console.log(`Inside Search component ${string}`);
    // console.log(this.state);
    if (!string) {
      return;
    }

    // this.props.onSearch({search: string, type: this.state.type});
    this.props.onSearch(string);

    // this.setState({search: '', type: 'jobs'}, () => console.log('After submit end', this.state));
  }
}

export default SearchBox;
