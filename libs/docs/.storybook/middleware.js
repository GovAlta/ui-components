require("../../../.storybook/middleware");
const path = require('path');

/**
 * Middleware injected into the backend express app
 * running the storybook.
 * Any changes to the file will require a restart of the server
 */
const expressMiddleWare = router => {
  router.use('/admin', (req, res) => {
    res.sendFile('index.html', {
      root: path.join(__dirname, '../cms/admin')
    }, function (err) {
      if (err) {
        res.status(404)
        console.error('Error rendering CMS page');
      }
      res.end();
    });
  });
};


module.exports = expressMiddleWare;
