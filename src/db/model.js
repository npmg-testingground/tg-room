// @flow
/**
 * This file handles the model/models for
 * the perticular microservice
 */

import Joi from 'joi';

export type RoomPayloadType = {
  number: number,
  floor: number
};

export const RoomModel: Object = Joi.object({
  number: Joi.number().integer().min(1),
  floor: Joi.number().integer().min(1)
}).required();

export const RoomModelRequired: Object = Joi.object({
	number: Joi.number().integer().min(1).required(),
  floor: Joi.number().integer().min(1).required()
}).required();
