let express = require('express');
let router = express.Router();

let service = require('../models/service-schema');

//create a service in the service database
router.route('/create').post((req, res, next) => {
  service.create(req.body, (error, data) => {
    if(error) {
      return next(error)
    }else{
      console.log(data)
      res.json(data)
    }
  })
})

// read all the services from the db
router.route('/').get((req, res, next) => {
  service.find((error, data) => {
    if(error){
      return next(error)
    } else {
      return res.json(data)
    }
  })
})

// get a single service
router.route('/findone/:id').get((req, res, next) => {
  service.findById(req.params.id, (error, data) => {
    if(error) {
      return next(error)
    }else {
      res.json(data)
    }
  })
})

// update a service
router.route('/update/:id').put((req, res, next) => {
  console.log(req.body)
  service.findByIdAndUpdate(req.params.id, {
    $set: req.body
    }, (error, data) => {
    if(error){
      return next(error);
    }else{
      res.json(req.body)
    }
  })
})

// delete a service
router.route('/delete/:id').delete((req, res, next) => {
  service.findByIdAndRemove(req.params.id, (error, data) => {
    if(error) {
      return next(error);
    } else {
      res.status(200).json({
        msg:data
      })
    }
  })
})

//make the router available
module.exports = router;