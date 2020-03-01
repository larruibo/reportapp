const MongoClient = require("mongodb").MongoClient;

function MongoUtils() {
  const mu = {},
    hostname = "localhost",
    port = 27017,
    dbName = "prueba",
    colName = "grades";

  mu.connect = () => {
    const client = new MongoClient(`mongodb://${hostname}:${port}`);
    return client.connect();
  };
  mu.grades = {};

  mu.grades.find = query =>
    mu.connect().then(client => {
      const gradesCol = client.db(dbName).collection(colName);
      return gradesCol
        .find(query)
        .sort({ grade: -1 })
        .limit(20)
        .toArray()
        .finally(() => client.close());
    });

  mu.grades.insert = grade =>
    mu.connect().then(client => {
      const gradesCol = client.db(dbName).collection(colName);
      return gradesCol.insertOne(grade).finally(() => client.close());
    });
  return mu;
}

module.exports = MongoUtils();
