import { celebrate, Joi, Segments } from 'celebrate';

export const idParamsValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  },
});

export const createOrderValidate = celebrate({
  [Segments.BODY]: {
    customerId: Joi.string().required(),
    products: Joi.array().required(),
  },
});
