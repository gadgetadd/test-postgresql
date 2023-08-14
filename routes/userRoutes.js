const { Router } = require('express');
const router = Router();

const controller = require('../controllers')
const { validateBody } = require('../middlewares')
const { userSchemas } = require('../schemas')

router.get('/', controller.getUsers);

router.get('/:role', controller.getUsers);

router.post('/', validateBody(userSchemas.addUserSchema),  controller.addUser);

router.delete('/:id', controller.deleteUser);

router.put('/:id', validateBody(userSchemas.updateUserSchema), controller.updateUser);

module.exports = router;