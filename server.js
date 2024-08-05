const express = require('express');
const app = require('./app');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


// info: https://www.digitalocean.com/community/tutorials/how-to-use-sequelize-with-node-js-and-mysql#step-2-creating-a-database-table-using-sequelize