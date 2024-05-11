import express from 'express';
import {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    updateUserSchema,
    createUserSchema
} from "../controllers/user";
import {validateSchema} from "../middlewares/validation";


const router = express.Router();

router.get('/', getAllUsers);
router.post('/', validateSchema(createUserSchema), createUser);
router.get('/:id', getUserById);
router.put('/:id', validateSchema(updateUserSchema), updateUser);
router.delete('/:id', deleteUser);

export default router;