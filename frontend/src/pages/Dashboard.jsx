import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Barre de navigation */}
      <header className="border-b border-slate-800 bg-slate-900 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            DevPulse
          </span>
          <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full">
            Tableau de Bord
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-slate-300">
            Bonjour, <strong className="text-white">{user?.username || 'Développeur'}</strong>
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-lg text-sm transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </header>

      {/* Contenu principal (Futur Kanban) */}
      <main className="p-8 max-w-7xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Bienvenue sur ton espace DevPulse 🚀</h2>
          <p className="text-slate-400 text-sm">
            Ton environnement frontend est configuré et sécurisé. C'est ici que nous allons intégrer ton tableau Kanban pour gérer tes projets et tes tâches avec Spring Boot.
          </p>
        </div>
      </main>
    </div>
  );
}