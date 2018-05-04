// import axios from 'axios';

const url = 'http://localhost:4000';

export const getCompany = (company) => {
  // console.log(company);
  return fetch(`${url}/companies/${company}`)
    .then((res) => res.json())
    .then((resJSON) => {
      // console.log(resJSON);
      return resJSON;
    }).catch((err) => {
        // console.log(err);
        return 400;
    })
}

export const getAllCompanies = () => {
  return fetch(`${url}/companies`)
    .then((res) => res.json())
    .then((resJSON) => {
      return resJSON;
      // console.log(resJSON);
    }).catch((err) => {
      return 404;
    })
}

export const getAllJobs = () => {
  return fetch(`${url}/jobs`)
  .then((res) => res.json())
  .then((resJSON) => {
    return resJSON;
  }).catch((err) => {
    return 404;
  });
}

export const getAllSearchedJobs = (name) => {
  return fetch(`${url}/jobs/${name}`)
    .then((res) => res.json())
    .then((resJSON) => {
      return resJSON;
    }).catch((err) => {
      return 404;
    })
}

export const getCompanySize = (company) => {
  // console.log(company);
  return fetch(`${url}/size/${company}`)
  .then((res) => res.json())
  .then((resJSON) => {
    return resJSON;
    // console.log(resJSON);
  }).catch((err) => {
    console.log(err);
  });
}

export const getCompanyJobs = (company) => {
  // console.log(company);
  return fetch(`${url}/${company}/jobs`)
    .then((res) => res.json())
    .then((resJSON) => {
      // console.log(resJSON);
      return resJSON;
    }).catch((err) => {
      // console.log('No');
      return 400;
    })
}

export const getReviews = (company) => {
  return fetch(`${url}/${company}/reviews`)
    .then((res) => res.json())
    .then((resJSON) => {
      return resJSON;
    }).catch((err) => {
      return 400;
    })
}

export const postReview = (company, data) => {
  // console.log(data);
  return fetch(`${url}/${company}/writereview`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(data)
  }).then((res) => {
    return res.status;
  }).catch((err) => {
    return 400;
  })
}

export const postJob = (data) => {
  // console.log(data);
  const {company} = data;
  return fetch(`${url}/postings/${company}`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(data)
  }).then((res) => {
    // console.log(res);
    return res.status;
  }).catch((err) => {
    return 400;
  });
}

export const getPostedJobs = (emailID) => {
  // console.log(company, emailID);
  return fetch(`${url}/postedby/${emailID}`)
    .then((res) => res.json())
    .then((resJSON) => {
      // console.log(resJSON);
      return resJSON;
    }).catch((err) => {
      return 404;
      // console.log(err);
    });
}

export const postJobApplication = (data, id) => {
  // console.log(data);
  return uploadResume(data.resume).then((response) => {
    data.resume = response.url;
    return fetch(`${url}/jobs/apply/${id}`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(data)
    })
    .then((res) => {
    return res.status
  }).catch((err) => {
    return err
    })
  }).catch((err) => {
    return err
  })
}

export const uploadResume = (file) => {
  // console.log(file);

  const data = new FormData();
  data.append('file', file);
  data.append('filename', file.name);

  return fetch(`${url}/jobs/resume`, {
    method: 'POST',
    body: data
  }).then((res) => {
    return res.json();
  }).then((resJSON) => {
    // console.log(resJSON);
    return resJSON;
  }).catch((err) => {
    console.log(err);
  });
}

/***********USERS**************/

export const addUser = (data) => {
  // console.log('In adduser method', data);
  return fetch(`${url}/users/adduser`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(data)
  })
  .then((res) => res.json())
  .then((resJSON) => {
    return resJSON;
  }).catch((err) => {
    // console.log(typeof err);
    return err;
  })
}

export const getUser = (user) => {
  // console.log(user);
  return fetch(`${url}/users/login`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(user)
  }).then((res) => {
    // console.log('Received back to API', res);
    if (res.status === 200) {
      // console.log('In success');
      return res.json();
    } else {
      // console.log('In failure');
      return;
    }

  }).catch((err) => {
    return err;
  });
}

export const uploadImage = (image, id) => {
  // console.log(image);
  // const data = {image};
  const data = new FormData();
  data.append('file', image);
  data.append('filename', image.name);

  // console.log(data);
  // console.log(image.name);

  return fetch(`${url}/users/avatar/${id}`, {
    method: 'POST',
    body: data
  }).then((res) => {
    // console.log(res.body);
    return res.status;
  }).catch((err) => {
    console.log(err);
  })
}

export const updateSkills = (skills, id) => {
  // console.log(skills);
  let data = {
    skills
  }
  // console.log(data);
  return fetch(`${url}/users/updateskills/${id}`, {
    method: 'PATCH',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(data)
  }).then((res) => {
    // console.log(res);
    res.json()
  }).then((resJSON) => {
    return resJSON;
  }).catch((err) => {
    console.log(err);
  })
}

export const updateProject = (project, id) => {
  // console.log(project);
  return fetch(`${url}/users/updateproject/${id}`, {
    method: 'PATCH',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body:JSON.stringify(project)
  }).then((res) => {
    return res.json();
  }).then((resJSON) => {
    return resJSON;
    // console.log(resJSON);
  }).catch((err) => {
    console.log(err);
  })
}

export const updateWork = (work, id) => {
  // console.log(work);
  return fetch(`${url}/users/updatework/${id}`, {
    method: 'PATCH',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body:JSON.stringify(work)
  }).then((res) => {
    return res.json();
  }).then((resJSON) => {
    return resJSON;
  }).catch((err) => {
    console.log(err);
  });
}

export const updateProfile = (userProfile, id) => {

  let data = {};

  for(var prop in userProfile){
    if (userProfile[prop] !== null && userProfile[prop] !== undefined && userProfile[prop].length) {
      data[prop]= userProfile[prop];
    }
  }
  // console.log(data);


  if (userProfile.file) {
    return uploadImage(userProfile.file, id).then((response) => {
      if (response === 200) {
        return fetch(`${url}/users/updateProfile/${id}`, {
          method: 'PATCH',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((resJSON) => {
          return resJSON;
        })
        .catch((err) => {
          console.log(err);
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  } else {
    return fetch(`${url}/users/updateProfile/${id}`, {
      method: 'PATCH',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((resJSON) => {
      return resJSON;
    }).catch((err) => {
      console.log(err);
    })
  }
}

export const logout = (tokens) => {
  // console.log('Got', tokens);
  return fetch(`${url}/users/me/token`, {
    method: 'DELETE',
    headers: new Headers({
      'x-auth': tokens.token
    })
  })
  .then((res) => {
    return res.status;
  })
  .catch((err) => {
    console.log(err);
  })
}
