import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminShell } from "./AdminShell";

export default async function ShellLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }
  return <AdminShell email={session.email}>{children}</AdminShell>;
}
