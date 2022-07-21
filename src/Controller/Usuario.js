import { openDb } from '../configdb.js';

export async function createTable(){
  openDb().then(db=>{
    db.exec('CREATE TABLE IF NOT EXISTS Usuario ( id INTEGER PRIMARY KEY, nome TEXT, email TEXT, senha TEXT, avatar TEXT, cargo TEXT, local TEXT, numero TEXT)')
  })
}

export async function createUser(req, res){
  let user = req.body

  if (!user.nome || user.nome.length < 2) {
    return res.json({
      "statusCode" : 400,
      "error": "Nome inválido."
    })
  }

  if (!user.email || user.email.length < 2 || !user.email.includes('@') || !user.email.includes('.')) {
    return res.json({
      "statusCode" : 400,
      "error": "Email inválido."
    })
  }

  if (!user.senha || user.senha.length < 3) {
    return res.json({
      "statusCode" : 400,
      "error": "Senha inválida."
    })
  }

  openDb().then(db=>{
    db.get('SELECT * FROM Usuario WHERE email=?', [user.email])
   .then(pessoas => {
    if(pessoas != null) {
      res.json({
        "statusCode" : 400,
        "error": "Email já cadastrado."
      })
    } else {
      openDb().then(db=>{
        db.run('INSERT INTO Usuario(nome, email, senha, avatar) VALUES (?, ?, ?, ?)', [user.nome, user.email, user.senha, user.avatar])
      })
      res.json({
        "statusCode" : 200,
        "error": "Usuário cadastrado com sucesso."
      })
    }
  });
 })
}

export async function addUserInfo(req, res){
  let user = req.body
  if(!user.cargo || !user.local || !user.numero){
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
      db.run('UPDATE Usuario SET cargo=?, local=?, numero=? WHERE id=?', [user.cargo, user.local, user.numero, user.id]);
    })
    res.json({
      "statusCode" : 200,
      "error": "Informacoes atualizadas."
    })
  }
}

export async function loginUser(req, res){
  let user = req.body

   openDb().then(db=>{
     db.get('SELECT * FROM Usuario WHERE email=?', [user.email])
    .then(pessoas=> {
      
      if(pessoas == null){
        res.json({
          "statusCode" : 400,
          "error": "Usuário não cadastrado."
        })
      } else {

        if(pessoas.senha != user.senha){
          res.json({
            "statusCode" : 400,
            "error": "Senha inválida."
          })
        }
  
        if(pessoas.senha == user.senha){
          res.json({
            "statusCode" : 200,
            "error": "Usuário aceito."
          })
        }
      }
      
      

    });
  })
}

export async function insertPessoa(req, res){
  let pessoa = req.body
  openDb().then(db=>{
    db.run('INSERT INTO Pessoa(nome, idade) VALUES (?, ?)', [pessoa.nome, pessoa.idade]);
  })
  res.json({
    "statusCode" : 200
  })
}

export async function updatePessoa(req, res){
  let pessoa = req.body
  openDb().then(db=>{
    db.run('UPDATE Pessoa SET nome=?, idade=? WHERE id=?', [pessoa.nome, pessoa.idade, pessoa.id]);
  })
  res.json({
    "statusCode" : 200
  })
}

export async function listPessoa(req, res){
   openDb().then(db=>{
     db.all('SELECT * FROM Usuario')
    .then(pessoa => res.json(pessoa));
  })
}

export async function selectUser(req, res){
  let email = req.body.email
  if(!email){
    return res.json({
      "statusCode" : 400,
      "error": "Falha ao carregar as informacoes"
    })
  }
   openDb().then(db=>{
     db.get('SELECT * FROM Usuario WHERE email=?', [email])
    .then(pessoas => {
        if(pessoas == null){
          return res.json({
            "statusCode" : 400,
            "error": "Usuario nao encontrado"
          })    
        } else {
          return res.json(pessoas)
        }
      });
  })
}

export async function deleteUser(req, res){
  let id = req.body.id
   openDb().then(db=>{
     db.get('DELETE FROM Usuario WHERE id=?', [id])
    .then(res=>res);
  })
  res.json({
    "statusCode" : 200
  })
}