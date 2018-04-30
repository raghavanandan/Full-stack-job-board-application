const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const {Job} = require('../models/jobs');

module.exports = (app) => {

  /*************GET all_jobs**************/
  app.get('/jobs/:name', (req, res) => {
    const {name} = req.params;

    Job.find({$text: {$search: name}}).then((docs) => {
      if (!docs.length) {
        return res.status(404).send('No matching jobs');
      }
      return res.send(docs);
    }).catch((err) => {
      res.status(400).send(err);
    })
  });

  /*************GET company_jobs**************/
  app.get('/:name/jobs', (req, res) => {
    const {name} = req.params;
    // console.log(name);

    Job.find({company: name}).then((docs) => {
      res.send(docs);
      // console.log(docs);
    }).catch((err) => {
      res.status(400).send(err);
    })
  });

  /*************GET posted_jobs**************/
  app.get('/postedby/:email', (req, res) => {
    const {email} = req.params;
    // console.log(email);

    Job.find({'postedBy.emailID': email}).then((docs) => {
      if (!docs.length) {
        return res.status(404).send('No jobs posted');
      }
      return res.send(docs);
    }).catch((err) => {
      res.status(400).send(err);
    })
  })

  /*************POST jobs**************/
  app.post('/postings/:name', (req, res) => {
    // const {name} = req.params;
    // console.log(name);
    // console.log(req.body);
    // const {emailID} = req.body;
    // console.log(emailID);
    // console.log(req.body);

    var time = moment().valueOf();
    var job = new Job({
      jobID: req.body.jobID,
      designation: req.body.designation,
      company: req.body.name,
      postedBy: [{
        name: req.body.postedBy,
        emailID: req.body.emailID
      }],
      postedOn: moment(time).format('ll'),
      description: req.body.description,
      location: req.body.location,
      requirements: req.body.requirements,
      status: req.body.status,
      type: req.body.type
    });

    // console.log('Before save', job);

    job.save().then((docs) => {
      // console.log(docs);
      res.send(docs);
    }).catch((err) => {
      res.status(400).send(err);
    })
  });


}
