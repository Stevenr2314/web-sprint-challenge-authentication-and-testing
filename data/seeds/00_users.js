
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'admin2', password: '$2b$08$6WS/.N6DRdl.JBroYVBn5evaXn8j7FttZhgFCFNvyg/sU6WSxuYg6'},
      ]);
    });
};
