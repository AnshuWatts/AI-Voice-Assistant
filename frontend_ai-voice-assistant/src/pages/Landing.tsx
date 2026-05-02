import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mic, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const featureList = [
  "Modern and clean website design",
  "Fully customizable modules",
  "Organized feature layout",
  "AI tools for productivity",
];

const barHeights = [16, 26, 36, 20, 30, 18, 24];

export default function Landing() {
  const authed =
    typeof window !== "undefined" &&
    sessionStorage.getItem("natasha:auth") === "1";
  const startPath = authed ? "/dashboard" : "/signin";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0f4c] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-1/4 h-[380px] w-[380px] rounded-full bg-fuchsia-500/30 blur-[130px]" />
        <div className="absolute bottom-[-120px] right-[-20px] h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(145,89,255,0.22),transparent_38%),radial-gradient(circle_at_84%_14%,rgba(74,196,255,0.22),transparent_34%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1320px] items-center px-5 py-12 md:px-10">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_1.45fr]">
          <section className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200"
            >
              <Sparkles className="h-3.5 w-3.5" />
              New Feature
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="max-w-xl font-display text-4xl font-bold leading-tight md:text-5xl"
            >
              AI Voice Assistant Website Feature
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="max-w-lg text-base text-white/85 md:text-lg"
            >
              Advanced voice AI feature for hands-free interaction and
              productivity across your website experience.
            </motion.p>

            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="inline-flex items-center rounded-full bg-gradient-to-r from-violet-500 to-indigo-400 px-4 py-2 text-sm font-semibold"
            >
              Responsive AI Website
            </motion.span>

            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="space-y-2.5"
            >
              {featureList.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-white/90">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-300" />
                  <span>{feature}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                to={startPath}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1a1a1a] transition-transform hover:scale-[1.02]"
              >
                Open Website
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </section>

          <section>
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[34px] border border-white/40 bg-[linear-gradient(120deg,rgba(123,60,255,0.95),rgba(85,73,255,0.92)_52%,rgba(80,157,255,0.9))] p-7 shadow-[0_0_38px_rgba(162,108,255,0.55)] md:p-10"
            >
              <div className="pointer-events-none absolute -top-8 left-[20%] h-16 w-1/2 bg-fuchsia-300/65 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-10 right-[16%] h-16 w-1/2 bg-fuchsia-400/55 blur-2xl" />

              <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-center">
                <div>
                  <span className="inline-flex rounded-full bg-fuchsia-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                    New
                  </span>
                  <h2 className="mt-5 font-display text-4xl font-bold leading-tight">
                    AI Voice Assistant
                  </h2>
                  <p className="mt-4 max-w-sm text-white/85">
                    Talk, ask, and get things done quickly using your voice.
                  </p>
                  <Link
                    to={startPath}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-base font-semibold text-[#121212] transition-transform hover:scale-[1.02]"
                  >
                    Start Now
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>

                <div className="flex justify-center md:justify-end">
                  <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-white/45 bg-white/10 shadow-[0_0_45px_rgba(255,255,255,0.35)]">
                    <span className="absolute h-52 w-52 rounded-full border border-white/25" />
                    <span className="absolute h-32 w-32 rounded-full border border-white/35" />
                    <WaveBars />
                    <WaveBars mirrored />
                    <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white/85 text-violet-700">
                      <Mic className="h-9 w-9" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </div>
  );
}

function WaveBars({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <div
      className={`absolute top-1/2 flex -translate-y-1/2 items-end gap-1 ${
        mirrored ? "right-[-66px] scale-x-[-1]" : "left-[-66px]"
      }`}
    >
      {barHeights.map((height, idx) => (
        <span
          key={`${height}-${idx}`}
          className="w-[5px] animate-wave rounded-full bg-gradient-to-b from-cyan-300 to-fuchsia-400"
          style={{ height, animationDelay: `${idx * 0.08}s` }}
        />
      ))}
    </div>
  );
}
