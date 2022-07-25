import { openDb } from "../configdb.js";

export async function createContraCheque() {
  openDb().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS ContraCheque ( id INTEGER PRIMARY KEY, email TEXT, salario TEXT, faltas TEXT, inss TEXT, vt TEXT, va TEXT, dterceiro TEXT, salariol TEXT)"
    );
  });
}

export async function addContraCheque(req, res) {
  let user = req.body;

  if (
    !user.email ||
    user.email.length < 2 ||
    !user.email.includes("@") ||
    !user.email.includes(".")
  ) {
    return res.json({
      statusCode: 400,
      error: "Email inválido.",
    });
  }

  openDb().then((db) => {
    db.get("SELECT * FROM Usuario WHERE email=?", [user.email]).then(
      (pessoas) => {
          openDb().then((db) => {
            db.get("SELECT * FROM ContraCheque WHERE email=?", [
              user.email,
            ]).then((pessoas) => {
              if (pessoas != null) {
                res.json({
                  statusCode: 400,
                  error: "ContraCheque já cadastrado.",
                });
              } else {
                openDb().then((db) => {
                  db.run(
                    "INSERT INTO ContraCheque(email, salario, faltas, inss, vt, va, dterceiro, salariol) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                    [
                      user.email,
                      user.salario,
                      user.faltas,
                      user.inss,
                      user.vt,
                      user.va,
                      user.dterceiro,
                      user.salariol,
                    ]
                  );
                });
                res.json({
                  statusCode: 200,
                  error: "ContraCheque cadastrado com sucesso.",
                });
              }
            });
          });
        
      }
    );
  });
}

export async function addContraChequeInfo(req, res) {
  let user = req.body;

  const verificaCaracteres = (string) => {
      return /^[\d,.?!]+$/.test(string)
  }

  if (
    !user.salario ||
    !verificaCaracteres(user.salario) ||
    !user.faltas ||
    !verificaCaracteres(user.faltas) ||
    !user.inss ||
    !verificaCaracteres(user.inss) ||
    !user.vt ||
    !verificaCaracteres(user.vt) ||
    !user.va ||
    !verificaCaracteres(user.va) ||
    !user.dterceiro ||
    !verificaCaracteres(user.dterceiro) ||
    !user.salariol ||
    !verificaCaracteres(user.salariol)
  ) {
    return res.json({
      statusCode: 400,
      error: "Informacoes em falta ou invalidas",
    });
  } else if (!user.email) {
    return res.json({
      statusCode: 400,
      error: "Email não indentificado!",
    });
  } else {
    openDb().then((db) => {
      db.get("SELECT * FROM ContraCheque WHERE email=?", [user.email]).then(
        (pessoas) => {
          if (pessoas == null) {
            return res.json({
              statusCode: 400,
              error: "Email não encontrado",
            });
          } else {
            openDb().then(db => {
              db.run(
                "UPDATE ContraCheque SET salario=?, faltas=?, inss=?, vt=?, va=?, dterceiro=?, salariol=? WHERE email=?",
                [
                  user.salario,
                  user.faltas,
                  user.inss,
                  user.vt,
                  user.va,
                  user.dterceiro,
                  user.salariol,
                  user.email
                ]
              );
            });
            res.json({
              statusCode: 200,
              error: "Informacoes atualizadas.",
            });
          }
        }
      );
    });
  }
}

export async function selectContraCheque(req, res){
  let email = req.body.email
  if(!email){
    return res.json({
      "statusCode" : 400,
      "error": "Falha ao carregar as informacoes"
    })
  }
   openDb().then(db=>{
     db.get('SELECT * FROM ContraCheque WHERE email=?', [email])
    .then(pessoas => {
        if(pessoas == null){
          return res.json({
            "statusCode" : 400,
            "error": "ContraCheque de usuario nao encontrado"
          })    
        } else {
          return res.json(pessoas)
        }
      });
  })
}

