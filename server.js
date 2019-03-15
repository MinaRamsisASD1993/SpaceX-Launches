const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const schema = require("./schema.js");

const app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});
