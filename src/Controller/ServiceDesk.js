import { openDb } from "../configdb.js";
import nodemailer from 'nodemailer'

export async function createTableServiceDesk() {
  openDb().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS ServiceDesk ( id INTEGER PRIMARY KEY, email TEXT, service TEXT, status TEXT, date TEXT, conclusion TEXT, answer TEXT)"
    );
  });
}

export async function addService(req, res) {
  let user = req.body;

  if (!user.email || !user.service || !user.status || !user.date || !user.conclusion) {
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
              "INSERT INTO ServiceDesk(email, service, status, date, conclusion, answer) VALUES (?, ?, ?, ?, ?, ?)",
              [
                user.email,
                user.service,
                user.status,
                user.date,
                user.conclusion,
                ""
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
  });
 })
}

export async function selService(req, res) {
  let user = req.body
  if(!user.email || !user.id){
    return res.json({
      msg: "Informacoes faltando",
      statusCode: 400
    })
  }
  openDb().then(db=>{
    db.all('SELECT * FROM ServiceDesk WHERE email=?', [user.email])
   .then(resultado => {
    for(let i = 0; i < resultado.length; i++){
      if(resultado[i].id == user.id) res.json(resultado[i]);
    }
    
  });
 })
}

export async function sendEmail(req, res) {
  let service = req.body
  if(!service.email || !service.service || !service.conclusion || !service.answer){
    return res.json({
      msg: "Informaçoes faltando",
      statusCode: 400
    })
  }

  let email = req.body.email
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "35fcacc2d3f228",
      pass: "ba94272eb9a894"
    }
  });

  var message = {
    from: "victormendes04012004@gmail.com",
    to: email,
    subject: `Serviço Concluído: ${service.service}`,
    text: `Corpo: ${service.conclusion}\nResposta: ${service.answer}`,
    html: "<p>HTML version of the message</p>"
  };

  transport.sendMail(message, (err) => {
    if(err) return res.json({
      erro: true,
      mensagem: "deu ruim"
    })
  });

  return res.json({
    erro: false,
    mensagem: `Enviado para ${email}`
  })
}

export async function putService(req, res){
  let user = req.body
  if(!user.email || !user.answer){
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
      db.run('UPDATE ServiceDesk SET answer=?, status=? WHERE id=?', [user.answer, true, user.id]);
    })
    res.json({
      "statusCode" : 200,
      "error": "Informacoes atualizadas."
    })
    
  }
}

export async function getServiceId(req, res){
  let user = req.body
  if(!user.email){
    return res.json({
      msg: "Informacoes faltando",
      statusCode: 400
    })
  }
  openDb().then(db=>{
    db.all('SELECT * FROM ServiceDesk WHERE email=?', [user.email])
   .then(resultado => {
    for(let i = 0; i < resultado.length; i++){
      if(resultado[i].answer === "modificado") res.json(resultado[i]);
    }
    
  });
 })
}
