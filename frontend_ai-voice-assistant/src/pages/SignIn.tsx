import { useState, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Cpu, Fingerprint, Lock, User, ArrowRight, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const redirectPath =
    ((location.state as { from?: { pathname?: string } } | null)?.from?.pathname ??
      "/dashboard");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    setLoading(true);
    setTimeout(() => {
      sessionStorage.setItem("natasha:auth", "1");
      sessionStorage.setItem("natasha:user", username.trim());
      navigate(redirectPath === "/" ? "/dashboard" : redirectPath, { replace: true });
    }, 900);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-4 py-10">
      {/* Animated grid + glow backdrop */}
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-40" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[120%] -translate-x-1/2 bg-gradient-glow opacity-70" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-96 w-[120%] -translate-x-1/2 bg-gradient-glow opacity-50" />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="pointer-events-none absolute left-[8%] top-[18%] h-32 w-32 rounded-full bg-primary/30 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 24, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        className="pointer-events-none absolute bottom-[12%] right-[10%] h-40 w-40 rounded-full bg-accent/30 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Glow ring around card */}
        <div className="absolute -inset-px rounded-[28px] bg-gradient-to-br from-primary/60 via-accent/30 to-transparent opacity-60 blur-md" />

        <div className="glass-panel relative overflow-hidden rounded-3xl p-8">
          {/* Top hex/scan line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <motion.div
            animate={{ y: ["0%", "1000%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-primary/60 blur-[2px]"
          />

          {/* Logo */}
          <div className="mb-7 flex flex-col items-center gap-3">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow-primary">
              <Cpu className="h-7 w-7 text-primary-foreground" />
              <span className="absolute -inset-2 rounded-3xl bg-primary/20 blur-lg" />
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-full border border-dashed border-primary/40"
              />
            </div>
            <div className="text-center">
              <h1 className="font-display text-2xl font-bold tracking-[0.25em] neon-text">
                NATASHA
              </h1>
              <p className="mt-1 text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
                Secure Access · v2.6
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FieldLabel icon={<User className="h-3.5 w-3.5" />} label="Operator ID" />
            <div className="relative">
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="commander"
                className="h-12 rounded-xl border-border/50 bg-card/60 pl-4 pr-4 font-mono text-sm focus-visible:ring-primary/60"
                autoFocus
              />
            </div>

            <FieldLabel icon={<Lock className="h-3.5 w-3.5" />} label="Access Key" />
            <div className="relative">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-12 rounded-xl border-border/50 bg-card/60 pl-4 pr-4 font-mono text-sm tracking-widest focus-visible:ring-primary/60"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !username.trim()}
              className={cn(
                "group relative mt-2 flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-primary font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-glow-primary transition-all duration-300",
                "hover:scale-[1.02] active:scale-[0.99] disabled:opacity-60 disabled:hover:scale-100"
              )}
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              {loading ? (
                <>
                  <Fingerprint className="h-4 w-4 animate-pulse" />
                  Authenticating…
                </>
              ) : (
                <>
                  Login
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-success" />
            Encrypted · Quantum-grade channel
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FieldLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
      <span className="text-primary-glow">{icon}</span>
      {label}
    </div>
  );
}
