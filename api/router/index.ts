import { z } from 'zod';
import { t } from '../context';
import { teamRouter } from './team';

export const appRouter = t.router({
  teams: teamRouter,
  greeting: t.procedure.input(z.object({ name: z.string() }).nullish()).query(({ input }) => {
    return `hello tRPC v10, ${input?.name ?? 'world'}!`;
  })
});

// export type definition of API
export type AppRouter = typeof appRouter;
