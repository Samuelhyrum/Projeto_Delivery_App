module.exports = (req, res, next) => {
    const { name, price } = req.body;
  
    if (!name || !price) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }
  
    return next();
  };
