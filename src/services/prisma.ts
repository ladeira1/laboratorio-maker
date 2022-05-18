/* eslint-disable no-param-reassign */
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  // Check incoming query type
  if (params.model === 'Product') {
    if (params.action === 'delete') {
      // Delete queries
      // Change action to an update
      params.action = 'update';
      params.args.data = { deleted: true };
    }
    if (params.action === 'deleteMany') {
      // Delete many queries
      params.action = 'updateMany';
      if (params.args.data !== undefined) {
        params.args.data.deleted = true;
      } else {
        params.args.data = { deleted: true };
      }
    }
    if (params.action === 'findUnique' || params.action === 'findFirst') {
      // Change to findFirst - you cannot filter
      // by anything except ID / unique with findUnique
      params.action = 'findFirst';
      // Add 'deleted' filter
      // ID filter maintained
      params.args.where.deleted = false;
    }
    if (params.action === 'findMany') {
      // Find many queries
      if (params.args.where) {
        if (params.args.where.deleted === undefined) {
          // Exclude deleted records if they have not been explicitly requested
          params.args.where.deleted = false;
        }
      } else {
        params.args.where = { deleted: false };
      }
    }
  }
  return next(params);
});
