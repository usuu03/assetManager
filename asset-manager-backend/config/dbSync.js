sequelize
  .sync()
  .then(() => {
    console.log("Models created successfully");
  })
  .catch((error) => {
    console.error("Unable to create tables: ", error);
  });
