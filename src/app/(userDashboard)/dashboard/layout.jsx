import { requiredRole, getUseSession } from "@/lib/core/session";
import DashboardLayoutClient from "./DashboardLayoutClient";

export default async function DashboardLayout({ children }) {
  const user = await getUseSession();

  

  if (!user) {
    redirect("/login");
  }

  await requiredRole("user");

  return (
    <DashboardLayoutClient user={user}>
      {children}
    </DashboardLayoutClient>
  );
}