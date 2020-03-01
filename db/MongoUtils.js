const MongoClient = require("mongodb").MongoClient;

function MongoUtils() {
  const mu = {},
    hostname = process.env.DB_HOST,
    port = process.env.DB_PORT,
    dbName = "reportapp",
    colName = "reportes";

  mu.connect = () => {
    const client = new MongoClient(`mongodb://${hostname}:${port}`);
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
  return mu;
}

module.exports = MongoUtils();
