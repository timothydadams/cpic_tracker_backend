
export const whitelist = [
    //list out domains you trust that need to communicate with your service
    'http://127.0.0.1:3000',
    'http://localhost:3000',
];

export const corsOptionsDelegate = (req, callback) => {
  let corsOptions

  if (whitelist.indexOf(req.header('origin')) !== -1) {
    corsOptions = { 
        origin: true,
        credentials:true,
        optionsSuccessStatus:200,
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    }
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
