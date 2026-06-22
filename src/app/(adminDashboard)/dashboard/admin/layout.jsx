import { requiredRole, getUseSession } from "@/lib/core/session";
import DashboardLayoutAdmin from "./DashboardLayoutAdmin";

export default async function DashboardLayout({ children }) {
  const user = await getUseSession();

  if (!user) {
    redirect("/login");
  }

  await requiredRole("admin");

  return (
    <DashboardLayoutAdmin user={user}>
      {children}
    </DashboardLayoutAdmin>
  );
}