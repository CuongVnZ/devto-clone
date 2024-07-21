import { z } from "zod"; // zod is a TypeScript-first schema declaration and validation library.

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const commentRouter = createTRPCRouter({
  // create: protectedProcedure
  //   .input(z.object({ title: z.string(), content: z.string() }))
  //   .mutation(async ({ ctx, input: { title, content } }) => {
  //     return ctx.db.comment.create({
  //       data: { 

  //       },
  //     });
  //   }),

  getById: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.blog.findUnique({
        where: { id: input },
        include: { createdBy: true },
      });
    }),

  getByUser: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.blog.findMany({
        where: { createdBy: { id: input } },
        include: { createdBy: true },
      });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
