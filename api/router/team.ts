import { t } from '../context';
import { z } from 'zod';

export const teamRouter = t.router({
  getAll: t.procedure.query(({ ctx }) => {
    return ctx.prisma.team.findMany();
  }),
  get: t.procedure.input(z.object({ teamId: z.number() })).query(({ ctx, input }) => {
    return ctx.prisma.team.findFirst({ where: { id: input.teamId } });
  }),
  add: t.procedure
    .input(z.object({ name: z.string().min(1), shortName: z.string().min(2) }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.team.create({
        data: { name: input.name, shortName: input.shortName, alias: input.name }
      });
    }),
  update: t.procedure
    .input(
      z.object({ id: z.number(), name: z.string().min(1), shortName: z.string().min(2), logo: z.string().optional() })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.team.delete({
        where: { id: input.id }
      });
    }),
  delete: t.procedure.input(z.object({ id: z.number() })).mutation(({ ctx, input }) => {
    return ctx.prisma.team.delete({
      where: { id: input.id }
    });
  })
});
