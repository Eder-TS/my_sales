import { Router } from 'express';
import UpdateUserAvatarControllers from '../controllers/UpdateUserAvatarControllers';
import multer from 'multer';
import uploadConfig from '@config/upload';
import AuthMiddleware from '@shared/middlewares/AuthMiddleware';

const avatarRouter = Router();
const updateUserAvatar = new UpdateUserAvatarControllers();
const upload = multer(uploadConfig);

avatarRouter.patch(
  '/',
  AuthMiddleware.execute,
  upload.single('avatar'),
  updateUserAvatar.update,
);

export default avatarRouter;
