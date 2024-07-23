/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";


export const userRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id }, ctx }) => {
      const currentUserId = ctx.session?.user.id;
      const profile = await ctx.db.user.findUnique({
        where: { id },
        select: {
          fullName: true,
          website: true,
          location: true,
          bio: true,
          name: true,
          email: true,
          image: true,
          _count: { 
            select: { 
              followers: true, 
              follows: true, 
              blogs: true, 
              comments: true,
            } 
          },
          followers: currentUserId == null ? undefined : { where: { id: currentUserId } }, // check if current user is following this user
        },
      });

      if (profile == null) return;

      return {
        ...profile,
        isFollowing: profile.followers.length > 0,
      };
    }),

  update: protectedProcedure
    .input(z.object({ fullName: z.string(), name: z.string(), email: z.string(), image: z.string() }))
    .mutation(async ({ input: { fullName, name, email, image }, ctx }) => {      
      const userId = ctx.session.user.id;
      
      return ctx.db.user.update({
        where: { id: userId },
        data: { fullName, name, email, image },
      });
    }),

  toggleFollow: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input: { userId }, ctx }) => {
      const currentUserId = ctx.session.user.id;
      const existingFollow = await ctx.db.user.findFirst({
        where: { id: userId, followers: { some: { id: currentUserId } } },
      });

      let addedFollow;
      if (existingFollow == null) {
        await ctx.db.user.update({
          where: { id: userId },
          data: { followers: { connect: { id: currentUserId } } },
        });
        addedFollow = true;
      } else {
        await ctx.db.user.update({
          where: { id: userId },
          data: { followers: { disconnect: { id: currentUserId } } },
        });
        addedFollow = false;
      }

      // void ctx.revalidateSSG?.(`/profiles/${userId}`);
      // void ctx.revalidateSSG?.(`/profiles/${currentUserId}`);

      return { addedFollow };
    }),

    delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx }) => {
      return ctx.db.user.delete({
        where: { id },
      });
    }),

    getSecretMessage: protectedProcedure.query(() => {
      return "you can now see this secret message!";
    }),
});
