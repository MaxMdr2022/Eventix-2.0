const server = require('./src/app.js');
const { eventsToDb } = require('./src/controllers/getEvents.js');
const { conn } = require('./src/db.js');
const { bulkCreateUsers } = require('./src/controllers/Users.js')

require('dotenv').config();

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, async () => {
    await eventsToDb()
    console.log(`%s listening at ${process.env.PORT}`); // eslint-disable-line no-console
    bulkCreateUsers();
  });
});
