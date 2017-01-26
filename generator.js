var NodeRSA = require('node-rsa');
var fs = require('fs');
var debug = require('debug')('rsa-generator');
var key = new NodeRSA({b: 512, e: 5});

debug('starting key generator configuration');
key.setOptions({
  encryptionScheme: {
    scheme: 'pkcs1',
    label: 'Optimization-Service'
  },
  signingScheme: {
    saltLength: 25
  }
});

debug('creating private_key');
var private_key = key.exportKey('pkcs1-private-pem');
debug('creating public_key');
var public_key = key.exportKey('pkcs8-public-pem');

fs.writeFile('./private.key', private_key, function (err) {
  if (err)
    debug('Failed to write private key')
  else
    debug('Private key created')
});

fs.writeFile('./public.pem', public_key, function (err) {
  if (err)
    debug('Failed to write public key')
  else
    debug('Public key created')
})
