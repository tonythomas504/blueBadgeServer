module.exports = (req, res, next) => {
    res.header('access-control-allow-origin', '*'); // tells the browser to allow code from any origin.
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE'); // specifies the method(s) allowed when accessing the resource in the response to a preflight request.
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    // is used in the response to a preflight request to indicate which HTTP headers can be used during the actual request
    next();
  }
    // CORS - Cross Origin Resource Sharing: mechanism that uses additional HTTP Headers to tell browsers to give a web application that is running at one origin, access to selected resources from a different origin.