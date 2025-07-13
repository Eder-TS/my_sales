import { celebrate, Joi, Segments } from 'celebrate';

export const createProductSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number()
      .options({ convert: false })
      .positive()
      .precision(2)
      .required(),
    quantity: Joi.number().integer().positive().required(),
  }),
});

// Nas validações de id foi usado o método number() pois, apesar de params vir
// como string, o bd aceita apenas números. então o método number() faz a conversão
// e lança o erro quando o resultado não for um número.
export const updateProductSchema = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().integer().positive().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number()
      .options({ convert: false })
      .positive()
      .precision(2)
      .required(),
    quantity: Joi.number().integer().positive().required(),
  }),
});

export const idParamsValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().integer().positive().required(),
  }),
});
