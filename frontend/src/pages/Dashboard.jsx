import { useAuth } from "../context/AuthContext";
import {
  Activity,
  CheckCircle2,
  FolderKanban,
  Layers,
  LogOut,
  Plus,
  Terminal,
} from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();

  // Gestion flexible selon la structure de stockage dans AuthContext
  const displayEmail = user?.email || user?.user?.email || "dev@devpulse.io";

  return (
    <div className="min-h-screen bg-[#07080B] bg-blueprint bg-noise text-zinc-100">
      {/* Navbar Fluted Glass */}
      <header className="sticky top-0 z-20 border-b border-white/10 fluted-glass">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg btn-thermal flex items-center justify-center font-mono font-bold text-white text-sm">
              DP
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-white">
              DevPulse
            </span>
            <span className="hidden sm:inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-mono text-zinc-400">
              WORKSPACE
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-zinc-400 hidden sm:block">
              {displayEmail}
            </span>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 hover:bg-rose-500/15 hover:border-rose-500/40 hover:text-rose-300 px-3.5 py-2 text-xs font-medium text-zinc-300 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* Contenu Principal */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* En-tête de section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-orange-400 mb-1">
              <Terminal className="w-3.5 h-3.5" />
              <span>// VUE D&apos;ENSEMBLE</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-white tracking-tight">
              Tableau de Bord
            </h1>
          </div>

          <button className="btn-thermal inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white cursor-pointer self-start sm:self-auto">
            <Plus className="w-4 h-4" />
            <span>Nouveau Projet</span>
          </button>
        </div>

        {/* Cartes de métriques */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-white/10 bg-[#0C0E14]/90 p-5">
            <div className="flex items-center justify-between text-zinc-400 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider">
                Projets Actifs
              </span>
              <Layers className="w-4 h-4 text-orange-400" />
            </div>
            <div className="font-display text-2xl font-bold text-white">0</div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0C0E14]/90 p-5">
            <div className="flex items-center justify-between text-zinc-400 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider">
                Tâches en cours
              </span>
              <Activity className="w-4 h-4 text-pink-400" />
            </div>
            <div className="font-display text-2xl font-bold text-white">0</div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0C0E14]/90 p-5">
            <div className="flex items-center justify-between text-zinc-400 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider">
                Complétées
              </span>
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="font-display text-2xl font-bold text-white">0%</div>
          </div>
        </div>

        {/* Zone Principale Dot Matrix */}
        <div className="relative rounded-2xl border border-white/10 bg-[#0C0E14]/90 bg-dot-matrix p-12 overflow-hidden">
          <div className="pointer-events-none absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-indigo-500/15 blur-[90px]" />

          <div className="relative max-w-lg mx-auto text-center">
            <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center mx-auto mb-4 text-orange-400">
              <FolderKanban className="w-6 h-6" />
            </div>
            <h2 className="font-display text-xl font-bold text-white">
              Aucun projet enregistré
            </h2>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
              L&apos;interface et le système d&apos;authentification sont opérationnels. Il ne reste plus qu&apos;à connecter l&apos;entité{" "}
              <code className="font-mono text-xs text-orange-300 bg-white/5 px-1.5 py-0.5 rounded">
                Project
              </code>{" "}
              côté Spring Boot pour gérer tes tableaux Kanban.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}