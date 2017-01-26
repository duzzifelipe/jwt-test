var jwt = require('jsonwebtoken');
var fs = require('fs');
var colors = require('colors');

// Read RSA keys from generated files
var private_key = fs.readFileSync('./private.key');
var public_key = fs.readFileSync('./public.pem');

// Generate a token in a synchronous function with private key
// to do it async, just pass a function(error, token) as the last argument
var token = jwt.sign({ foo: 'bar' }, new Buffer(private_key), { algorithm: 'RS256', expiresIn: 60 * 60 });
console.log('Encoded Token is:'.bold.red);
console.log(token);

// Pass generated token to decoder together with public key
jwt.verify(token, new Buffer(public_key), { algorithms: ['RS256'] }, function(err, decoded) {
  if (err) {
    console.log('Ouch!');
    console.log(err);

  } else {
    console.log('\n' + 'Decoded value is:'.bold.yellow);
    console.log(decoded);
  }
});
