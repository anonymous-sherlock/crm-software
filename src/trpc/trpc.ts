import { getAuthSession } from "@/lib/authOption";
import { TRPCError, initTRPC } from "@trpc/server";
import { Session } from "next-auth";

const t = initTRPC.create();
const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
  const session = await getAuthSession();
  const { user } = session as Session;

  if (!user || !user.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      userId: user.id,
      user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
