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
  }
}
module.exports = pathController
