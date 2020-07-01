// Create Root User
db.createUser({
  user: "root",
  pwd: "example",
  roles: [
    {
      role: "readWrite",
      db: "payments",
    },
  ],
});
