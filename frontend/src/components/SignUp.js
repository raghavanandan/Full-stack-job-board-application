import React, { Component } from 'react';
// import {Route} from 'react-router-dom';
// import ProfilePage from './ProfilePage';
import * as API from '../api/API';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      isEmployer: false,
      company: '',
      designation: '',
      isLoggedIn: true
    }

    this.handleJobSeekerSignUp = this.handleJobSeekerSignUp.bind(this);
    this.handleEmployerSignUp = this.handleEmployerSignUp.bind(this);
    this.handleJobSeekerLogin = this.handleJobSeekerLogin.bind(this);
    this.handleEmployerLogin = this.handleEmployerLogin.bind(this);
  }

  componentDidMount() {
    // console.log(this.props);
  }

  handleJobSeekerSignUp(event) {
    event.preventDefault();
    var flag = 0;
    for(var key in this.state) {
      if (this.state[key]) {
        flag+=1;
        // console.log('Flag', flag);
      }
    }
    if(flag===5 && this.state.isEmployer === false) {
      // console.log('Awesome');
      const {firstname, lastname, email, username, password, isEmployer} = this.state;
      var user = {
        firstname,
        lastname,
        email,
        username,
        password,
        isEmployer
      };

      // console.log(user);

      API.addUser(user).then((data) => {
        if (data === 200) {
          console.log('Signed In');
        } else {
          console.log('Not signed in');
        }
      }).catch((err) => {
        console.log(err);
      })
    }
    // console.log(this.state);
  }

  handleEmployerSignUp(event) {
    event.preventDefault();
    var flag = 0;
    for(var key in this.state) {
      if (this.state[key]) {
        flag+=1;
        // console.log('Flag', flag);
      }
    }
    // this.setState({isEmployer: true});
    // console.log('state', this.state);
    this.setState({isEmployer: true}, () => {
      if (flag === 6 && this.state.isEmployer === true) {
        const {firstname, lastname, email, password, company, designation, isEmployer} = this.state;
        var user = {
          firstname,
          lastname,
          email,
          company,
          designation,
          password,
          isEmployer
        }

        // console.log(user);

        API.addUser(user).then((res) => {
          // console.log(data);
          if (res.status === 200) {
            console.log('Employer set');
          } else {
            console.log(res);
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    });
  }

  handleJobSeekerLogin(event) {
    event.preventDefault();
    // const {username, password} = this.state;
    // console.log(username, password);
    if (this.state.username && this.state.password) {
      // var user = {username, password};
      // console.log(user);

      // API.getUser(user).then((res) => {
      //   // console.log('In component page', res);
      //   // console.log(typeof res);
      //   if (res) {
      //     this.setState({isLoggedIn: true});
      //     let username = res.username;
      //     this.props.history.push({
      //       pathname: `/${username}`,
      //       state: username
      //     });
      //     console.log('Logged In as job seeker');
      //   }
      // }).catch((err) => {
      //   return err;
      // });
      // this.setState({isLoggedIn: true});
      // this.props.onLogin({
      //   username: this.state.username,
      //   password: this.state.password
      // });
      let user = this.state;
      // console.log(user);
      this.props.onLogin(user);
      // console.log(this.state.isLoggedIn);
      // this.props.history.push({
      //   pathname: `${this.state.username}`
      // })
    }
  }

  handleEmployerLogin(event) {
    event.preventDefault();
    // const {email, password} = this.state;
    // console.log(email, password);
    if (this.state.email && this.state.password) {
      let user = this.state;
      // console.log(user);
      // console.log('Employer login', user);
      // var employer = {email, password};

      // API.getUser(employer).then((res) => {
      //   if (res.status === 200) {
      //     this.setState({isLoggedIn: true});
      //     console.log('Logging in as employer');
      //   } else {
      //     console.log('Data is', res);
      //   }
      // }).catch((err) => {
      //   console.log(err);
      // });
      this.props.onLogin(user);
    }
  }

  renderSignup() {
    return (
      <div>

        <div>
          <h2>SignUp as a Job Seeker</h2>
          <form onSubmit={this.handleJobSeekerSignUp}>
            <label>
              Firstname: <input
                type="text"
                name="fname"
                // value={this.state.firstname}
                onChange={(event) => this.setState({firstname: event.target.value})}
              />
            </label><br />
            <label>
              Lastname: <input
                type="text"
                name="lname"
                // value={this.state.lastname}
                onChange={(event) => this.setState({lastname: event.target.value})}
              />
            </label><br />
            <label>
              Email: <input
                type="email"
                name="email"
                // value={this.state.email}
                onChange={(event) => this.setState({email: event.target.value})}
              />
            </label><br />
            <label>
              Username: <input
                type="text"
                name="uname"
                // value={this.state.username}
                onChange={(event) => this.setState({username: event.target.value})}
              />
            </label><br />
            <label>
              Password: <input
                type="password"
                name="pwd"
                // value={this.state.password}
                onChange={(event) => this.setState({password: event.target.value})}
              />
            </label><br /><br />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        <div>
          <h2>SignUp as an Employer</h2>
          <form onSubmit={this.handleEmployerSignUp}>
            <label>
              Firstname: <input
                type="text"
                name="fname"
                // value={this.state.firstname}
                onChange={(event) => this.setState({firstname: event.target.value})}
              />
            </label><br />
            <label>
              Lastname: <input
                type="text"
                name="lname"
                // value={this.state.lastname}
                onChange={(event) => this.setState({lastname: event.target.value})}
              />
            </label><br />
            <label>
              Work Email: <input
                type="email"
                name="email"
                // value={this.state.email}
                onChange={(event) => this.setState({email: event.target.value})}
              />
            </label><br />
            <label>
              Password: <input
                type="password"
                name="pwd"
                // value={this.state.password}
                onChange={(event) => this.setState({password: event.target.value})}
              />
            </label><br />
            <label>
              Company: <input
                type="text"
                name="company"
                // value={this.state.company}
                onChange={(event) => this.setState({company: event.target.value})}
              />
            </label><br />
            <label>
              Designation: <input
                type="text"
                name="job"
                // value={this.state.designation}
                onChange={(event) => this.setState({designation: event.target.value})}
              />
            </label><br /><br />
            <button type="submit">Sign Up</button>
          </form>
        </div>

      </div>
    )
  }

  renderLogin() {
    // let username = this.state.username;
    // let url = `/${username}`;
    // console.log(url);
    return (
      <div>

        <div>
          <h2>Login as Job Seeker</h2>
          <form onSubmit={this.handleJobSeekerLogin}>
            <label>
              Username: <input
                type="text"
                name="uname"
                onChange={(event) => this.setState({username: event.target.value})}
              />
            </label><br />
            <label>
              Password: <input
                type="password"
                name="pwd"
                onChange={(event) => this.setState({password: event.target.value})}
              />
            </label><br /><br />
            <button type="submit">Login</button>
          </form><br />
          <a onClick={() => this.setState({isLoggedIn: false})}>Don't have an account?</a>
        </div>

        <div>
          <h2>Login as Employer</h2>
          <form onSubmit={this.handleEmployerLogin}>
            <label>
              Email: <input
                type="email"
                name="email"
                onChange={(event) => this.setState({email: event.target.value})}
              />
            </label><br />
            <label>
              Password: <input
                type="password"
                name="pwd"
                onChange={(event) => this.setState({password: event.target.value})}
              />
            </label><br /><br />
            <button type="submit">Login</button>
          </form><br />
          <a onClick={() => this.setState({isLoggedIn: false})}>Don't have an account?</a>
        </div>

        {/* <Route path={url} component={ProfilePage}/> */}

      </div>
    )
  }

  render() {
    // console.log(this.state.isLoggedIn);
    if (this.state.isLoggedIn) {
      return this.renderLogin();
    } else {
      return this.renderSignup();
    }
  }
}

export default SignUp;
