'use strict';
const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async create(ctx) {
    const { id } = ctx.req.user;
    const answer = await strapi.services.answer.create({ ...ctx.request.body, users_permissions_user: id });
    const question = await strapi.query('question').findOne({ id: answer.question.id });
    await strapi.query('question').update({ id: answer.question.id }, { answers: [ ...question.answers, answer.id ] });
    return sanitizeEntity(answer, { model: strapi.models.answer });
  }
};
