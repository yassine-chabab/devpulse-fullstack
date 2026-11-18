import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ArrowRight, Lock, Mail, Terminal, User } from "lucide-react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register({ username, email, password });
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Erreur lors de la création du compte."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#07080B] bg-blueprint bg-noise overflow-hidden px-4">
      {/* Lueur Thermal Gradient */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[540px] h-[320px] rounded-full bg-gradient-to-tr from-orange-500/20 via-pink-500/15 to-indigo-500/20 blur-[110px]" />

      {/* Carte Fluted Glass */}
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 fluted-glass p-8 shadow-2xl">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-orange-400 mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>SYS://INIT_ACCOUNT</span>
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white">
            Créer un espace
          </h1>
          <p className="mt-1.5 text-sm text-zinc-400">
            Configure ton profil développeur pour accéder à DevPulse.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs font-mono text-rose-300">
            [ERR] {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
              Nom d&apos;utilisateur
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="yassine_dev"
                className="w-full rounded-xl border border-white/10 bg-black/50 pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-orange-500/60 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yassine@devpulse.io"
                className="w-full rounded-xl border border-white/10 bg-black/50 pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-orange-500/60 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-black/50 pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-orange-500/60 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-thermal w-full mt-2 flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-semibold text-white cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? "Initialisation..." : "Créer le compte"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-zinc-400">
          Déjà enregistré ?{" "}
          <Link
            to="/login"
            className="font-medium text-orange-400 hover:text-orange-300 underline underline-offset-4"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}