import React from "react";
import UpgradeLesson from "./UpgradeLesson";
import { getUseSession, requiredRole } from "@/lib/core/session";
import { redirect } from "next/navigation";

const UpgradePage = async () => {
  const user = await getUseSession();

  if (!user) {
    redirect("/auth/login");
  }

  await requiredRole("user");

  return (
    <div>
      <UpgradeLesson></UpgradeLesson>
    </div>
  );
};

export default UpgradePage;
