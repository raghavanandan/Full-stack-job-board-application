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

export const getAllJobs = (name) => {
  return fetch(`${url}/jobs/${name}`)
    .then((res) => res.json())
    .then((resJSON) => {
      return resJSON;
    }).catch((err) => {
      return 404;
    })
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

/***********USERS**************/

export const addUser = (data) => {
  // console.log('In adduser method', data);
  return fetch(`${url}/users/adduser`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(data)
  }).then((res) => {
    return res;
  }).catch((err) => {
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

export const updateProfile = (userProfile, id) => {
  // console.log(newData);
  return fetch(`${url}/users/updateprofile/${id}`, {
    method: 'PATCH',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(userProfile)
  })
  .then((res) => res.json())
  .then((resJSON) => {
    // console.log(resJSON);
    return resJSON;
  })
  .catch((err) => {
    console.log(err);
  })
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
