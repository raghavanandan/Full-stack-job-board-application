const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cloudinary = require('cloudinary').v2;
const {Job} = require('../models/jobs');

module.exports = (app, upload) => {

  

  /*************GET all_jobs**************/
  app.get('/jobs', (req, res) => {

    Job.find().then((docs) => {
      if (!docs.length) {
        return res.status(404).send('No jobs');
      }
      return res.send(docs);
    }).catch((err) => {
      res.status(400).send(err);
    })
  })

  /*************GET all_searched_jobs**************/
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

    /*************Upload resume**************/
    app.post('/jobs/resume', upload.single('file'), (req, res) => {
      // console.log(req.file);

      cloudinary.uploader.upload(req.file.path, {resource_type: "raw"}, (err, response) => {
        if (err) {
          return res.status(500).send('Server error');
        }
        return res.send({url: response.secure_url});
        // console.log(response);
      });

    })

    /*************Apply for_a_job**************/
    app.post('/jobs/apply/:id', (req, res) => {
      // console.log(req.body);

      /**************Mailing module**************/
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: '',
          pass: ''
        }
      });


      const mailOptions = {
        to: req.body.email,
        subject: 'Thank you for applying',
        text: 'Thank you for applying at JobSeek. Our team will get back to you if its a good fit'
      };

      var time = moment().valueOf();
      req.body.postedOn = moment(time).format('ll');

      Job.findByIdAndUpdate(
        {_id: req.params.id},
        {$push: {
          applied: {
            $each: [req.body],
            $position: 0
          }
        }},
        {returnOriginal: false}
      ).then((doc) => {
        if (!doc) {
          return res.status(404).send('No jobs found');
        }

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log(err);
          }
        })
        return res.send(doc);
      }).catch((err) => {
        res.status(400).send(err);
      })
    })


}
