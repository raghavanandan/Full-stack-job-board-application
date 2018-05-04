import React, {Component} from 'react';
// import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
// import loadJS from 'loadjs';
import { Button } from 'react-bootstrap';
import Navbar from './Navbar';
import * as API from '../api/API';

class EditProfile extends Component {
  constructor(props){
    super(props);
    this.state = this.props.location.state;
    // this.state = this.props.data;
    this.state.file = null;

    this.handleTabPage = this.handleTabPage.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
    // this.seeChange = this.seeChange.bind(this);
  }

  componentWillMount(){
      // console.log(this.props.match.params);
  }

  componentDidMount() {
    // this.loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyAGNzAK5WqdJKD9KXLXC1Yiu52t_pWg2NA&libraries=places");
  }

  handleTabPage(tab) {
    // console.log('In profile', tab);
    let profile = this.state.firstname.toLowerCase() + this.state.lastname.toLowerCase();
    tab = tab.toLowerCase();
    // console.log(tab);
    if (tab === 'logout') {
      API.logout(this.state.tokens[0]).then((response) => {
        if (response === 200) {
          this.setState({redirect: true});
        }
      }).catch((err) => {
        console.log(err);
      })
    } else if (tab === 'profile') {
      this.props.history.push({
        pathname: `/in/${profile}`,
        state: this.state
      })
    } else {
      this.props.history.push({
        pathname: `/${tab}`,
        state: this.state
      })
    }
  }

  handleUpload(event){
    event.preventDefault();
    let id = this.state._id;
    this.setState({file: event.target.files[0]}, () => {
      API.uploadImage(this.state.file, id).then((response) => {
        // this.setState({avatar: response.url})
        console.log(response.url);
      }).catch((err) => {
        console.log(err);
      });
      // console.log(this.state.file);
    });
  }

  handleUpdateProfile(event) {
    event.preventDefault();
    // console.log(this.state);
    let id = this.state._id;
    var loc = document.getElementById("location").value;
    // console.log("loc "+loc);
    this.setState({location: loc});
    let data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      file: this.state.file,
      skills: this.state.skills,
      designation: this.state.designation,
      location: loc,
      linkedin: this.state.linkedin,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      github: this.state.github,
      blog: this.state.blog
    }

    console.log(data);
    API.updateProfile(data, id).then((response) => {
      // console.log(response);
      this.setState(response);
      this.props.history.push({
        pathname: `/in/${this.props.match.params.name}`,
        state: this.state
      });
    }).catch((err) => {
      console.log(err);
    })

  }

  render() {
    let profile = this.props.location.state.firstname + ' ' + this.props.location.state.lastname;
    // let profile = this.props.data.firstname + ' ' + this.props.data.lastname;
    return (
      <div id="whole-page">
      <div className="container">
        <div className="navbar">
          <Navbar
            onSearch={this.handleIt}
            status={this.state.isLoggedIn}
            data={this.props.location.state}
            chooseTab={this.handleTabPage} />
        </div>

        <div className="container edit-profile-content">

          <div className="row edit-profile-name">
            {/* <h4 className="col-md-12">{this.state.firstname} {this.state.lastname} / Edit Profile
              <a className="col-md-2 pull-right cancel" onClick={this.handleEditProfile}>Cancel</a>
            </h4> */}
            {/* <div className="row"> */}
              <div className="col-md-9 bread">
                <h4>{profile} / Edit Profile</h4>
              </div>
              <div className="col-md-3 cancel">
                <a onClick={() => this.handleTabPage('profile')}>Cancel</a> &nbsp;&nbsp;&nbsp;
                <Button className="btn btn-primary btn-md" onClick={this.handleUpdateProfile}>Save</Button>
              </div>
            {/* </div> */}
          </div>
          <hr />

          <div className="row edit-profile-body">
            <div className="col-md-6 personal">
              <h5><b>Personal Information:</b></h5>
              <form className="form-horizontal">
                <br />
                <div className="form-group">
                  <label className="col-sm-4 control-label">Firstname: </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      className="form-control input-sm"
                      value={this.state.firstname}
                      onChange={(event) => this.setState({firstname: event.target.value})}
                     />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-4 control-label">Lastname: </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      className="form-control input-sm"
                      value={this.state.lastname}
                      onChange={(event) => this.setState({lastname: event.target.value})}
                     />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-4 control-label">Photo: </label>
                  <div className="col-sm-7">
                    <input
                      type="file"
                      className="form-control-file"
                      name="avatar"
                      onChange={(event) => this.setState({file: event.target.files[0]})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-4 control-label">Skills: </label>
                  <div className="col-sm-7">
                    <textarea
                      className="form-control" cols="50" rows="3"
                      value={this.state.skills}
                      onChange={(event) => this.setState({skills: event.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-4 control-label">Profession: </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      className="form-control input-sm"
                      value={this.state.designation === 'N/A' ? '' : this.state.designation}
                      placeholder={this.state.designation === 'N/A' ? 'What do you do?' : null}
                      onChange={(event) => this.setState({designation: event.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-4 control-label">Location: </label>
                  <div className="col-sm-7">
                    <input
                      id="location"
                      type="text"
                      className="form-control input-sm"
                      value={this.state.location}
                      placeholder={this.state.location ? null : 'Add a location' }
                      onChange={(event) => {
                        this.setState({location: event.target.value})
                        window.initMap()
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="col-md-6 links">
              <h5><b>Links:</b></h5>
              <form className="form-horizontal">
                <br />
                <div className="form-group">
                  <label className="col-sm-4 control-label">LinkedIn: </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      className="form-control input-sm"
                      value={this.state.linkedin}
                      placeholder={this.state.linkedin ? null : 'Add your linkedin profile' }
                      onChange={(event) => this.setState({linkedin: event.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-4 control-label">Twitter: </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      className="form-control input-sm"
                      value={this.state.twitter}
                      placeholder={this.state.twitter ? null : 'Add your twitter profile' }
                      onChange={(event) => this.setState({twitter: event.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-4 control-label">Facebook: </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      className="form-control input-sm"
                      value={this.state.facebook}
                      placeholder={this.state.facebook ? null : 'Add your facebook profile' }
                      onChange={(event) => this.setState({facebook: event.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-4 control-label">GitHub: </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      className="form-control input-sm"
                      value={this.state.github}
                      placeholder={this.state.github ? null : 'Add your github profile' }
                      onChange={(event) => this.setState({github: event.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-4 control-label">Blog: </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      className="form-control input-sm"
                      value={this.state.blog}
                      placeholder={this.state.blog ? null : 'Add your blog profile' }
                      onChange={(event) => this.setState({blog: event.target.value})}
                    />
                  </div>
                </div>
              </form>
            </div>


          </div>

        </div>
      </div>
    </div>
    )
  }
}

export default EditProfile;
