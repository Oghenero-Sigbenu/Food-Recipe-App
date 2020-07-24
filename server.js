const app = require("./app");
const sequelize = require("./config/database");

const PORT = process.env.PORT || 5000;

sequelize.sync()
    .then(result => {
        //create a server and listens
        app.listen(PORT, () =>  console.log("Server is running on PORT 5000"))
    })
        .catch((err) => console.log(err || "failed to connect"));
