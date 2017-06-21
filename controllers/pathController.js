let Path = require('../models/path');

let pathController = {

  save: (req, res, next) => {
    const start = req.body.start;
    const end = req.body.end;
    const route = JSON.parse(req.body.route);

    const path = new Path({
      start: start,
      end: end,
      route: []
    });
    for (var i in route) {
      path.route.push(route[i])
    }

    path.save ((err, path) => {
      console.log('path is saved');

      if (err) {
        console.log(err.message);
        return;
      }
    });
  },

  saveOwnPath: (req, res, next) => {
    if(err){
      console.log(err.message);
      return;
    }
    if(!req.user){
      alert("Please login!");
    }
  },
  getRoute: (req, res, next) => {
    const start = req.body.start;
    const end = req.body.end;
    var markers;
    Path.find({start: start, end: end}, (err, paths) => {

      if(err){
        console.log(err);
        return res.json({"error": "error"});
      }
      console.log(paths[0].route);

      res.json(paths[0].route);
    })
  },

  getSavedRoute: (req, res, next) => {
    const start = req.body.start;
    console.log(start);
    const end = req.body.end;
    console.log(end);

  }
}
module.exports = pathController
