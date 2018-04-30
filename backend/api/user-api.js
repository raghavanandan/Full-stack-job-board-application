const express = require('express');
const moment = require('moment');
const {User} = require('../models/users');

module.exports = (app) => {

  /********Get all_users**********/
  app.get('/users', (req, res) => {
    User.find().then((docs) => {
      res.send(docs);
    }).catch((err) => {
      res.status(400).send(err);
    })
  });

  /********Get one_user**********/
  // app.get('/users/:username', (req, res) => {
  //   const {username} = req.params;
  //   // console.log(req.body);
  //   User.find({username}).then((doc) => {
  //     res.send(doc);
  //   }).catch((err) => {
  //     res.status(400).send(err);
  //   })
  // });

  /********Check login_user**********/
  app.post('/users', (req, res) => {
    const {username, password} = req.body;
    // console.log(username, password);
    User.find({username, password}).then((doc) => {
      if (!doc.length || doc[0].isEmployer) {
        return res.status(404).send('Invalid login');
      } else {
        return res.send(doc);
      }
    }).catch((err) => {
      res.status(400).send(err);
    })
  });

  /********Check login_employer**********/
  app.post('/employers', (req, res) => {
    const {email, password} = req.body;
    // console.log(email, password);
    User.find({email, password}).then((doc) => {
      if (!doc.length || !doc[0].isEmployer) {
        return res.status(404).send('Invalid login');
      } else {
        return res.send(doc);
      }
    }).catch((err) => {
      res.status(400).send(err);
    })
  })

  /********POST new_user**********/
  app.post('/users/adduser', (req, res) => {
    // console.log(req.body);
    const { firstname, lastname, username, company, designation, isEmployer, email, password } = req.body;
    var time = moment().valueOf();
    if (isEmployer === true) {
      var user = new User({
        firstname,
        lastname,
        email,
        password,
        company,
        designation,
        isEmployer,
        joined: moment(time).format('ll')
      });
    } else {
      var user = new User({
        firstname,
        lastname,
        username,
        email,
        password,
        joined: moment(time).format('ll')
      });
    }

    user.save().then((user) => {
      // res.send(docs);
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    }).catch((err) => {
      res.status(400).send(err);
    })
  });

  /********Update user_profile**********/
  app.patch('/users/updateprofile/:id', (req, res) => {
    const {id} = req.params;
    const {firstname, lastname, email, designation, company} = req.body;
    var user = {
      firstname,
      lastname,
      email,
      designation,
      company
    };

    User.findByIdAndUpdate(id, {$set: user}, {new: true}).then((user) => {
      if (!user) {
        return res.status(404).send();
      }
      return res.send(user);
    }).catch((err) => {
      res.send(400).send(err);
    })
  })

  var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    // console.log(req.body);
    // console.log(token);

    User.findByToken(token).then((user) => {
      if (!user) {
        return Promise.reject();
      }
      req.user = user;
      req.token = token;
      next();
    }).catch((err) => {
        res.status(401).send();
      })
    }

  app.post('/users/me', authenticate, (req, res) => {
    // console.log(req);
    res.send(req.user);
  });


  app.post('/users/login', (req, res) => {
    var {email, password, username} = req.body;
    // console.log(username, password);
    var type, data;
    if (email) {
      type = 'email';
      data = email;
      // console.log('Passed credential is ', type, data);
    } else if (username) {
      type = 'username';
      data = username;
      // console.log('Passed credential is ', type, data);
    }

    User.findByCredentials(type, data, password).then((user) => {
      // console.log(user);
      return user.generateAuthToken().then((token) => {
        // console.log(user);
        return res.header('x-auth', token).send(user);
      });
    }).catch((err) => {
      res.status(400).send('Not found');
    });
  });


  app.delete('/users/me/token', authenticate, (req, res) => {
    // console.log(req.token);
    req.user.removeToken(req.token).then(() => {
      res.status(200).send();
    }, () => {
      res.status(400).send();
    })
  });


}
