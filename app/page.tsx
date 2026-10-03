"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CircuitBoard,
  GitBranch,
  History,
  Sparkles,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: CircuitBoard,
    title: "Build Freely",
    description:
      "Create and design your own digital circuits with an intuitive workspace.",
  },
  {
    icon: Zap,
    title: "Simulate Instantly",
    description:
      "Change inputs and watch your circuit respond in real time.",
  },
  {
    icon: History,
    title: "Remember Everything",
    description:
      "Your circuits, activity, and progress stay safely connected to your account.",
  },
  {
    icon: GitBranch,
    title: "Keep Experimenting",
    description:
      "Save your work, return later, and continue exactly where you stopped.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F7FB] text-[#18181B]">
      {/* Navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C3AED] text-white shadow-sm">
            <CircuitBoard size={22} />
          </div>

          <span className="text-xl font-bold tracking-tight">
            Circuit<span className="text-[#7C3AED]">Craft</span>
          </span>
        </div>

        <button className="rounded-xl border border-[#E4E4E7] bg-white px-5 py-2.5 text-sm font-medium transition hover:border-[#C4B5FD] hover:bg-[#FAF9FF]">
          Sign In
        </button>
      </nav>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-16 lg:grid-cols-2 lg:px-10 lg:pt-24">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#DDD6FE] bg-[#EDE9FE] px-4 py-2 text-sm font-medium text-[#6D28D9]"
          >
            <Sparkles size={16} />
            Your personal digital laboratory
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Build.
            <br />
            Simulate.
            <br />
            <span className="text-[#7C3AED]">Understand.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-7 max-w-xl text-lg leading-8 text-[#71717A]"
          >
            CircuitCraft is your personal digital logic laboratory. Build
            circuits freely, experiment with logic, simulate your designs, and
            come back to your work whenever you want.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <button className="group flex items-center gap-3 rounded-xl bg-[#7C3AED] px-6 py-3.5 font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-[#6D28D9]">
              Start Building
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            <button className="rounded-xl border border-[#E4E4E7] bg-white px-6 py-3.5 font-semibold transition hover:border-[#C4B5FD] hover:bg-[#FAF9FF]">
              Explore
            </button>
          </motion.div>
        </div>

        {/* Circuit Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-3xl border border-[#E4E4E7] bg-white shadow-xl shadow-purple-100/50">
            <div className="flex items-center justify-between border-b border-[#E4E4E7] px-5 py-4">
              <div>
                <p className="text-sm font-semibold">My First Circuit</p>
                <p className="text-xs text-[#A1A1AA]">Live simulation</p>
              </div>

              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#D4D4D8]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#D4D4D8]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#D4D4D8]" />
              </div>
            </div>

            <div
              className="relative h-[380px] overflow-hidden p-8"
              style={{
                backgroundImage:
                  "radial-gradient(#E4E4E7 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            >
              {/* Input A */}
              <div className="absolute left-8 top-24 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#DDD6FE] bg-[#EDE9FE] font-bold text-[#7C3AED]">
                  A
                </div>
                <div className="h-px w-20 bg-[#64748B]" />
              </div>

              {/* Input B */}
              <div className="absolute left-8 top-48 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#DDD6FE] bg-[#EDE9FE] font-bold text-[#7C3AED]">
                  B
                </div>
                <div className="h-px w-20 bg-[#64748B]" />
              </div>

              {/* AND Gate */}
              <div className="absolute left-1/2 top-28 flex -translate-x-1/2 items-center">
                <div className="relative flex h-28 w-32 items-center justify-center rounded-r-[55px] rounded-l-lg border-2 border-[#7C3AED] bg-white font-bold text-[#7C3AED] shadow-sm">
                  AND
                </div>
              </div>

              {/* Output wire */}
              <div className="absolute right-20 top-[165px] h-px w-20 bg-[#64748B]" />

              {/* Output */}
              <div className="absolute right-8 top-[145px] flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#DCFCE7] bg-[#22C55E] shadow-lg shadow-green-100">
                <div className="h-3 w-3 rounded-full bg-white" />
              </div>

              {/* Connection dots */}
              <div className="absolute left-[38%] top-[132px] h-2.5 w-2.5 rounded-full bg-[#7C3AED]" />
              <div className="absolute left-[38%] top-[228px] h-2.5 w-2.5 rounded-full bg-[#7C3AED]" />
            </div>

            <div className="flex items-center justify-between border-t border-[#E4E4E7] px-5 py-4">
              <span className="text-xs text-[#71717A]">
                3 components · 2 connections
              </span>

              <span className="flex items-center gap-2 text-xs font-medium text-[#16A34A]">
                <span className="h-2 w-2 rounded-full bg-[#16A34A]" />
                Simulation running
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="border-t border-[#E4E4E7] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#7C3AED]">
              Made for experimentation
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              More than a logic gate simulator.
            </h2>

            <p className="mt-4 leading-7 text-[#71717A]">
              CircuitCraft gives every student their own space to build,
              experiment, save, and understand digital circuits.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="rounded-2xl border border-[#E4E4E7] bg-[#F7F7FB] p-6 transition hover:-translate-y-1 hover:border-[#C4B5FD]"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#7C3AED]">
                    <Icon size={21} />
                  </div>

                  <h3 className="font-semibold">{feature.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-[#71717A]">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E4E4E7] bg-[#F7F7FB]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-[#71717A] sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>
            © {new Date().getFullYear()} CircuitCraft
          </p>

          <p>Build. Simulate. Explore.</p>
        </div>
      </footer>
    </main>
  );
}