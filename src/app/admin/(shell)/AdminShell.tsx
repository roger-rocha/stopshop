"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  Layers,
  FileText,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/lib/server/actions/auth";

type NavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
};

const navItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/stores", label: "Lojas", icon: Store },
  { href: "/admin/segments", label: "Segmentos", icon: Layers },
  { href: "/admin/posts", label: "Posts", icon: FileText },
  { href: "/admin/settings", label: "Configurações", icon: Settings },
];

export function AdminShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email: string;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="border-b border-border-default bg-white lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:border-b-0 lg:border-r">
        <div className="flex h-full flex-col">
          <div className="px-6 py-6">
            <Link href="/admin" className="block">
              <span className="font-display text-xl font-bold text-brand-navy">
                Stop<span className="text-brand-coral">Shop</span>
              </span>
              <span className="mt-1 block text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
                Painel administrativo
              </span>
            </Link>
          </div>

          <nav className="flex-1 px-3 pb-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = item.exact
                  ? pathname === item.href
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-button px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-brand-navy text-white"
                          : "text-text-secondary hover:bg-surface-soft hover:text-text-primary"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-border-default px-3 py-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 rounded-button px-3 py-2 text-xs text-text-muted hover:text-text-primary"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Ver site
            </Link>
            <div className="mt-2 rounded-button bg-surface-soft px-3 py-2 text-xs text-text-secondary">
              {email}
            </div>
            <form action={logoutAction} className="mt-2">
              <button
                type="submit"
                className="flex w-full items-center gap-2 rounded-button px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-soft hover:text-brand-coral"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </button>
            </form>
          </div>
        </div>
      </aside>

      <main className="flex-1 lg:ml-64">
        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10">{children}</div>
      </main>
    </div>
  );
}
