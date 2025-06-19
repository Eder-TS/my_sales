import { celebrate, Joi, Segments } from 'celebrate';

export const UpdateProfileSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string(),
    email: Joi.string().email(),
    old_password: Joi.string(),
    password: Joi.string().optional(),
    password_confirmation: Joi.string()
      .valid(Joi.ref('password'))
      .when('password', { is: Joi.exist(), then: Joi.required }),
  },
});
