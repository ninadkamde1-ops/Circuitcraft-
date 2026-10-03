"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CircuitBoard,
  Clock3,
  LogOut,
  Plus,
  Settings,
  Sparkles,
  Zap,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type UserInfo = {
  email?: string;
  name?: string;
};

type Circuit = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<UserInfo | null>(null);
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const {
          data: { user: currentUser },
        } = await supabase.auth.getUser();

        if (!currentUser) {
          router.replace("/auth");
          return;
        }

        setUser({
          email: currentUser.email,
          name:
            currentUser.user_metadata?.full_name ||
            currentUser.email?.split("@")[0] ||
            "Student",
        });

        const { data: circuitData, error } = await supabase
          .from("circuits")
          .select("id, name, created_at, updated_at")
          .order("updated_at", { ascending: false });

        if (error) {
          console.error("Error loading circuits:", error);
          return;
        }

        setCircuits(circuitData || []);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [router, supabase]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/");
    router.refresh();
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F7FB]">
        <div className="flex items-center gap-3 text-[#7C3AED]">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#DDD6FE] border-t-[#7C3AED]" />
          <span className="text-sm font-medium">
            Loading CircuitCraft...
          </span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7FB] text-[#18181B]">

      {/* Navigation */}
      <header className="border-b border-[#E4E4E7] bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">

          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7C3AED] text-white">
              <CircuitBoard size={20} />
            </div>

            <span className="text-lg font-bold tracking-tight">
              Circuit<span className="text-[#7C3AED]">Craft</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">

            <button
              type="button"
              className="hidden rounded-xl p-2.5 text-[#71717A] transition hover:bg-[#F4F4F5] hover:text-[#18181B] sm:block"
            >
              <Settings size={19} />
            </button>

            <div className="hidden h-8 w-px bg-[#E4E4E7] sm:block" />

            <div className="flex items-center gap-3">

              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold">{user?.name}</p>
                <p className="max-w-40 truncate text-xs text-[#A1A1AA]">
                  {user?.email}
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EDE9FE] font-semibold text-[#7C3AED]">
                {user?.name?.charAt(0).toUpperCase()}
              </div>

              <button
                type="button"
                onClick={handleLogout}
                title="Log out"
                className="rounded-xl p-2.5 text-[#71717A] transition hover:bg-red-50 hover:text-red-600"
              >
                <LogOut size={18} />
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">

        {/* Welcome */}
        <section className="mb-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#7C3AED]">
                <Sparkles size={16} />
                Your personal digital laboratory
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome back, {user?.name?.split(" ")[0]} 👋
              </h1>

              <p className="mt-2 text-[#71717A]">
                Ready to build something interesting?
              </p>
            </div>

            <Link
              href="/circuits/new"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#7C3AED] px-5 py-3 font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-[#6D28D9]"
            >
              <Plus size={19} />
              Create Circuit
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

          </div>
        </section>

        {/* Stats */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            icon={<CircuitBoard size={20} />}
            label="My Circuits"
            value={String(circuits.length)}
            description={
              circuits.length === 0 ? "Start building" : "Saved projects"
            }
          />

          <StatCard
            icon={<Zap size={20} />}
            label="Simulations"
            value="0"
            description="No runs yet"
          />

          <StatCard
            icon={<Activity size={20} />}
            label="Activities"
            value="0"
            description="Coming soon"
          />

          <StatCard
            icon={<Clock3 size={20} />}
            label="Lab Time"
            value="0m"
            description="Keep experimenting"
          />

        </section>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">

          {/* My Circuits */}
          <section className="rounded-2xl border border-[#E4E4E7] bg-white">

            <div className="flex items-center justify-between border-b border-[#E4E4E7] px-6 py-5">

              <div>
                <h2 className="font-semibold">My Circuits</h2>

                <p className="mt-1 text-sm text-[#71717A]">
                  Your saved circuit projects
                </p>
              </div>

              <Link
                href="/circuits/new"
                className="text-sm font-medium text-[#7C3AED] hover:text-[#6D28D9]"
              >
                Create one
              </Link>

            </div>

            {circuits.length === 0 ? (

              <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">

                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EDE9FE] text-[#7C3AED]">
                  <CircuitBoard size={27} />
                </div>

                <h3 className="font-semibold">
                  Your workspace is empty
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-[#71717A]">
                  Create your first circuit and start experimenting with
                  digital logic.
                </p>

                <Link
                  href="/circuits/new"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#DDD6FE] bg-[#FAF9FF] px-4 py-2.5 text-sm font-semibold text-[#7C3AED] transition hover:bg-[#EDE9FE]"
                >
                  <Plus size={17} />
                  Create your first circuit
                </Link>

              </div>

            ) : (

              <div className="divide-y divide-[#F4F4F5]">

                {circuits.slice(0, 6).map((circuit) => (
                  <Link
                    key={circuit.id}
                    href={`/circuits/${circuit.id}`}
                    className="flex items-center justify-between px-6 py-4 transition hover:bg-[#FAFAFA]"
                  >

                    <div className="flex min-w-0 items-center gap-4">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#7C3AED]">
                        <CircuitBoard size={19} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-medium">
                          {circuit.name}
                        </p>

                        <p className="mt-1 text-xs text-[#A1A1AA]">
                          Updated {formatDate(circuit.updated_at)}
                        </p>
                      </div>

                    </div>

                    <ArrowRight
                      size={17}
                      className="shrink-0 text-[#A1A1AA]"
                    />

                  </Link>
                ))}

              </div>

            )}

          </section>

          {/* Activity */}
          <section className="rounded-2xl border border-[#E4E4E7] bg-white">

            <div className="border-b border-[#E4E4E7] px-6 py-5">

              <h2 className="font-semibold">Recent Activity</h2>

              <p className="mt-1 text-sm text-[#71717A]">
                Your latest actions
              </p>

            </div>

            <div className="flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F4F4F5] text-[#71717A]">
                <Activity size={21} />
              </div>

              <h3 className="font-medium">
                Activity tracking is next
              </h3>

              <p className="mt-2 max-w-xs text-sm leading-6 text-[#A1A1AA]">
                Your circuit creation and simulation activity will appear here
                once we add the activity system.
              </p>

            </div>

          </section>

        </div>

        {/* Bottom callout */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-[#DDD6FE] bg-[#EDE9FE]">

          <div className="flex flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">

            <div>

              <div className="mb-2 flex items-center gap-2 font-semibold text-[#6D28D9]">
                <Zap size={18} />
                Start experimenting
              </div>

              <p className="max-w-xl text-sm leading-6 text-[#5B21B6]">
                There are no rules here. Build a simple logic gate, a full
                adder, or something completely your own.
              </p>

            </div>

            <Link
              href="/circuits/new"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#7C3AED] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6D28D9]"
            >
              Open Workspace
              <ArrowRight size={17} />
            </Link>

          </div>

        </section>

      </div>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E4E4E7] bg-white p-5">

      <div className="mb-4 flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#7C3AED]">
          {icon}
        </div>

        <span className="text-xs text-[#A1A1AA]">
          {description}
        </span>

      </div>

      <p className="text-2xl font-bold">
        {value}
      </p>

      <p className="mt-1 text-sm text-[#71717A]">
        {label}
      </p>

    </div>
  );
}