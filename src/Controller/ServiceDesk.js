import { openDb } from "../configdb.js";

export async function createTableServiceDesk() {
  openDb().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS ServiceDesk ( id INTEGER PRIMARY KEY, email TEXT, service TEXT, status TEXT, date TEXT, conclusion TEXT)"
    );
  });
}

export async function addService(req, res) {
  let user = req.body;

  if (!user.email || !user.service || !user.status || !user.date) {
    return res.json({
      statusCode: 400,
      error: "Informacoes ausente.",
    });
  }

  openDb().then((db) => {
    db.get("SELECT * FROM Usuario WHERE email=?", [user.email]).then(
      (pessoas) => {
        if (pessoas == null) {
          return res.json({
            statusCode: 400,
            error: "Email não encontrado",
          });
        } else {
          openDb().then((db) => {
            db.run(
              "INSERT INTO ServiceDesk(email, service, status, date, conclusion) VALUES (?, ?, ?, ?, ?)",
              [
                user.email,
                user.service,
                user.status,
                user.date,
                user.conclusion,
              ]
            );
          });

          res.json({
            statusCode: 200,
            error: "Serviço cadastrado com sucesso.",
          });
        }
      }
    );
  });
}

export async function getService(req, res) {
  let user = req.body
  openDb().then(db=>{
    db.all('SELECT * FROM ServiceDesk WHERE email=?', [user.email])
   .then(resultado => {
    res.json(resultado)
    console.log(resultado.length)
  });
 })
}

export async function putService(req, res){
  let user = req.body
  if(!user.conclusion || !user.email){
    return res.json({
      "statusCode" : 400,
      "error": "Informacoes em falta"
    })
  } else if(!user.id){
    return res.json({
      "statusCode" : 400,
      "error": "Id não indentificado!"
    })
  }else{
    openDb().then(db=>{
      db.run('UPDATE ServiceDesk SET conclusion=?, status=? WHERE id=?', [user.conclusion, true, user.id]);
    })
    res.json({
      "statusCode" : 200,
      "error": "Informacoes atualizadas."
    })
  }
}
