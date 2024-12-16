exports.handleError = (err, res) => { //function that handles the error.
    console.error(err);
    res.status(500).json({ error: 'An unexpected error occurred' }); 
  };