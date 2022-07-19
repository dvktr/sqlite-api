import { createTable, insertPessoa, updatePessoa, listPessoa, selectPessoa, deletePessoa } from './Controller/Usuario.js';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    "statusCode": 200,
    "msg": "Api rodando"
  })
})

router.get('/pessoa', listPessoa);
router.get('/selpessoa', selectPessoa);
router.post('/pessoa', insertPessoa);
router.put('/pessoa', updatePessoa);
router.delete('/pessoa', deletePessoa);

export default router;