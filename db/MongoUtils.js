const MongoClient = require("mongodb").MongoClient;
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

function MongoUtils() {
  const mu = {},
    hostname = "localhost",
    port = 27017,
    dbName = "reportapp",
    colName = "reportes";

  mu.connect = () => {
    const pass = process.env.PASS;
    const client = new MongoClient(
      "mongodb+srv://sebas:" +
        "sebas" +
        "@robos-slq5d.mongodb.net/test?retryWrites=true&w=majority"
    );
    return client.connect();
  };
  mu.reportes = {};

  mu.reportes.find = query =>
    mu.connect().then(client => {
      const reportesCol = client.db(dbName).collection(colName);
      return reportesCol
        .find(query)
        .sort({ timestamp: -1 })
        .toArray()
        .finally(() => client.close());
    });

  mu.reportes.insert = grade =>
    mu.connect().then(client => {
      const reportesCol = client.db(dbName).collection(colName);
      return reportesCol.insertOne(grade).finally(() => client.close());
    });
  mu.passport = {};

  mu.passport.register = (_name, _email, _password) => {
    mu.connect().then(client => {
      const nuevo = {
        name: _name,
        email: _email,
        password: _password
      };
      const usuarioNuevo = client.db(dbName).collection("usuario");
      return usuarioNuevo.insertOne(nuevo).finally(() => client.close());
    });
  };

  mu.passport.find = query =>
    mu.connect().then(client => {
      const reportesCol = client.db(dbName).collection("usuario");
      return reportesCol
        .find(query)
        .sort({ timestamp: -1 })
        .limit(20)
        .toArray()
        .finally(() => client.close());
    });

  mu.passport.findEmail = query =>
    mu.connect().then(client => {
      const reportesCol = client.db(dbName).collection("usuario");
      return reportesCol
        .find({ email: query })
        .sort({ timestamp: -1 })
        .limit(20)
        .toArray()
        .finally(() => client.close());
    });

  return mu;
}

module.exports = MongoUtils();
