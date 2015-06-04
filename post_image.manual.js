var request = require('request')
  , fs = require('fs')
  , server_name = process.env.OPENSHIFT_SERVER || "http://localhost:8080"
  , username = process.env.USERNAME || "jefferson"
  , cuid = process.env.CUID || "007"
  , submission = process.env.SUBMISSION || "awesome"


var readStream = fs.createReadStream('static/img/cherries.png');
var png = fs.readFileSync(__dirname + '/static/img/cherries.png');
var url = server_name + '/doodle?username='+username+'&cuid='+cuid+'&submission='+submission;

request({method: 'HEAD', url: server_name + '/status'}, function(error, response, body) {
  console.log(error, response.statusCode, body);
})

readStream.pipe(request.put(url, function (err, res, body) {
  if (err) {
    throw new Error(err);
  }
  console.log('res', res.body);
}));
