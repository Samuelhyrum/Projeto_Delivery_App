module.exports = (req, res, next) => {
    const { userId, sellerId } = req.body;
  
    if (!userId || !sellerId) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }
  
    return next();
  };
