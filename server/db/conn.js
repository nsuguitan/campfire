const getAtlasURI = async () => {
  var AWS = require("aws-sdk"),
    region = "us-east-1",
    secretName = "atlas-uri-for-mongo";
  // Create a Secrets Manager client
  var awsClient = new AWS.SecretsManager({
    region: region,
  });

  // In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
  // See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
  // We rethrow the exception by default.

  return awsClient.getSecretValue({ SecretId: secretName }).promise();
}; // Load the AWS SDK

const getDbString = async () => {
  let atlasURI = JSON.parse((await getAtlasURI()).SecretString).ATLAS_URI;
  return atlasURI;
};

var _db;

module.exports = {
  connectToServer: async function (callback) {
    const { MongoClient } = require("mongodb");

    const Db = await getDbString();

    const client = new MongoClient(Db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    client.connect(function (err, db) {
      if (db) {
        _db = db.db("CampfireDB");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};
