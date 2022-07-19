import { createTable, createUser, loginUser, updatePessoa, listPessoa, selectPessoa, deleteUser } from './Controller/Usuario.js';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    "statusCode": 200,
    "msg": "Api rodando"
  })
  createTable();
})

router.post('/cadastro', createUser)
router.get('/login', loginUser);
router.delete('/user', deleteUser);
/*router.get('/pessoa', listPessoa);
router.get('/selpessoa', selectPessoa);
router.post('/pessoa', insertPessoa);
router.put('/pessoa', updatePessoa);

*/
export default router;