import { Router } from 'express';
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from '../schemas/PasswordSchemas';
import SendForgotPasswordEmailController from '../controllers/SendForgotPasswordEmailController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const sendForgotPasswordEmailController =
  new SendForgotPasswordEmailController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  ForgotPasswordSchema,
  sendForgotPasswordEmailController.create,
);

passwordRouter.post(
  '/reset',
  ResetPasswordSchema,
  resetPasswordController.create,
);

export default passwordRouter;
