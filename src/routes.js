import { createTable, createUser, loginUser, addUserInfo, listPessoa, selectUser, deleteUser } from './Controller/Usuario.js';
import { createContraCheque, addContraCheque, addContraChequeInfo, selectContraCheque } from './Controller/ContraCheque.js'
import { createTableServiceDesk, addService, getService, getServiceId, selService, putService, sendEmail } from './Controller/ServiceDesk.js'
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    "statusCode": 200,
    "msg": "Api rodando"
  })
  createTable();
  createContraCheque();
  createTableServiceDesk();
})

router.post('/cadastro', createUser)
router.post('/login', loginUser);
router.delete('/user', deleteUser);
router.get('/pessoa', listPessoa);
router.put('/user', addUserInfo);
router.post('/seluser', selectUser);

router.post('/contracheque/cadastro', addContraCheque)
router.put('/contracheque', addContraChequeInfo)
router.post('/contracheque', selectContraCheque)

router.post('/servicedesk/add', addService)
router.post('/servicedesk', getService)
router.put('/servicedesk', putService)
router.post('/selservice', selService)
router.post('/sendemail', sendEmail)
router.post('/getserviceid', getServiceId)

/*router.post('/pessoa', insertPessoa);


*/
export default router;