import { z } from "zod"; // zod is a TypeScript-first schema declaration and validation library.
import slugify from "slugify";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const blogRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ title: z.string(), content: z.string(), tags: z.array(z.string()), coverExtension: z.string() }))
    .mutation(async ({ ctx, input: { title, content, tags, coverExtension } }) => {
      // regenerate slug if title is changed
      let slug = slugify(title.toLowerCase());
      // check if slug is unique
      const existingBlog = await ctx.db.blog.findFirst({ where: { slug } });
      if (existingBlog) {
        // add a random string (4 chars) to the slug to make it unique
        const randomString = Math.random().toString(36).substring(2, 6);
        slug = `${slug}-${randomString}`;
      }

      return ctx.db.blog.create({
        data: { 
          title,
          tags,
          coverExtension,
          content,
          slug,
          createdBy: { connect: { id: ctx.session.user.id } }, 
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.blog.findMany({
      select: {
        id: true,
        coverExtension: true,
        title: true,
        slug: true,
        tags: true,
        createdBy: { select: { id: true, name: true, fullName: true, image: true } },
        createdAt: true,
        _count: { 
          select: { 
            likes: true,
            comments: true,
          } 
        },
      }
    });
  }),

  getBySlug: publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    return ctx.db.blog.findUnique({
      where: { slug: input },
      include: {
        _count: {
          select: { 
            likes: true,
            comments: true,
          }
        },
        createdBy: true 
      },
    });
  }),
  
  getById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      console.log("input", input);
      return ctx.db.blog.findUnique({
        where: { id: input },
        include: {
          _count: {
            select: { 
              likes: true,
              comments: true,
            }
          },
          createdBy: true 
        },
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
    
  update: protectedProcedure
    .input(z.object({ id: z.string(), title: z.string(), tags: z.array(z.string()), content: z.string(), coverExtension: z.string() }))
    .mutation(async ({ ctx, input: { id, title, tags, content, coverExtension } }) => {
      // // regenerate slug if title is changed
      // let slug = slugify(title);
      // // check if slug is unique
      // const existingBlog = await ctx.db.blog.findFirst({ where: { slug } });
      // if (existingBlog && existingBlog.id !== id) {
      //   // add a random string (4 chars) to the slug to make it unique
      //   const randomString = Math.random().toString(36).substring(2, 6);
      //   slug = `${slug}-${randomString}`;
      // }

      return ctx.db.blog.update({
        where: { id },
        data: { title, content, tags, coverExtension, updatedAt: new Date()},
      });
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.blog.delete({ where: { id: input } });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
