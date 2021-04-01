'use strict';
const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async create(ctx) {
    const { id } = ctx.req.user;
    const question = await strapi.services.question.create({ ...ctx.request.body, users_permissions_user: id });
    return sanitizeEntity(question, { model: strapi.models.question });
  }
};
