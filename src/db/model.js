/**
 * This file handles the model/models for
 * the perticular microservice
 */

import Joi from 'joi';

export const RoomModel = Joi.object({
  number: Joi.number().integer().min(1),
  floor: Joi.number().integer().min(1)
}).required();

export const RoomModelRequired = Joi.object({
	number: Joi.number().integer().min(1).required(),
  floor: Joi.number().integer().min(1).required()
}).required();
