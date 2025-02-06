
// lue ympäristömuuttujat
const backendUser = process.env.MONGO_BACKEND_USER;
const backendPassword = process.env.MONGO_BACKEND_PASSWORD;
const databaseName = process.env.MONGO_DATABASE;
const admin = process.env.MONGO_INITDB_ROOT_USERNAME;
const adminPassword = process.env.MONGO_INITDB_ROOT_PASSWORD;

db.createUser({
  user: admin,
  pwd: adminPassword,
  roles: [
    { role: "root", db: "admin" } // Oikeudet admin-tietokantaan
  ]
})

// Vaihda tietokantaan
db = db.getSiblingDB(databaseName); 

// luo käyttäjä backendille
db.createUser({
    user: backendUser,
    pwd: backendPassword,
    roles: [
      { role: "readWrite", db: databaseName } // Oikeudet tietokantaan
    ]
  });

// lisää esimerkkidata, jotta tietokanta luodaan näkyväksi
db.users.insertOne({nimi:"Matti", ika: 25});
