
module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
  