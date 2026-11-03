"use server";

import { redirect } from "next/navigation";
import { login, logout } from "@/lib/auth";
import { loginSchema } from "@/lib/validators";

export type LoginState =
  | { status: "idle" }
  | { status: "error"; message: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const firstError =
      parsed.error.issues[0]?.message ?? "Verifique os campos e tente novamente.";
    return { status: "error", message: firstError };
  }

  const result = await login(parsed.data.email, parsed.data.password);
  if (!result.ok) {
    return { status: "error", message: result.error };
  }

  const nextPath = formData.get("next");
  const safePath = typeof nextPath === "string" &&
    (nextPath === "/admin" || nextPath.startsWith("/admin/")) &&
    !/[\\\x00-\x20\x7f]/.test(nextPath)
    ? nextPath
    : "/admin";
  redirect(safePath);
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}
