import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getUseSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user || null;
};

export const requiredRole = async (role) => {
  const user = await getUseSession();

  if(!user){
    redirect('/auth/login')
  }

  if (user?.role !== role) {
    redirect("/unauthorize");
  }

  return user;
};
