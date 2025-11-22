import { useState, useEffect } from 'react';
import './index.css';
import { Header } from './components/Header';
import { AddAgenda } from './components/AddAgenda';
import { AgendaList } from './components/AgendaList';
import { Auth } from './components/Auth';
import { useAuth } from './contexts/AuthContext';
import { Footer } from './components/Footer';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  isCarriedOver?: boolean;
}

export interface Agenda {
  id: string;
  title: string;
  tasks: Task[];
  createdAt: number;
}

function App() {
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [overlayState, setOverlayState] = useState<{ visible: boolean; message: string; type: 'error' | 'success' }>({
    visible: false,
    message: '',
    type: 'error'
  });
  const [currentPage, setCurrentPage] = useState<'app' | 'privacy' | 'terms'>('app');

  const { user, loading, isPasswordRecovery } = useAuth();

  // Handle hash-based navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the #
      if (hash === 'privacy') {
        setCurrentPage('privacy');
      } else if (hash === 'terms') {
        setCurrentPage('terms');
      } else {
        setCurrentPage('app');
        window.location.hash = ''; // Clear hash
      }
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const triggerOverlay = (message: string, type: 'error' | 'success') => {
    setOverlayState({ visible: true, message, type });
    setTimeout(() => {
      setOverlayState(prev => ({ ...prev, visible: false }));
    }, 2500);
  };

  // Update favicon based on today's agenda completion
  useEffect(() => {
    if (agendas.length === 0) {
      // Default favicon when no agendas
      updateFavicon('/red.png');
      return;
    }

    const todayAgenda = agendas[0]; // Most recent agenda
    const totalTasks = todayAgenda.tasks.length;
    const completedTasks = todayAgenda.tasks.filter(t => t.completed).length;
    const completionPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    let faviconPath = '/red.png'; // Default red

    if (totalTasks > 0) {
      if (completionPercentage >= 80) {
        faviconPath = '/green.png';
      } else if (completionPercentage >= 30) {
        faviconPath = '/orange.png';
      }
    }

    updateFavicon(faviconPath);
  }, [agendas]);

  const updateFavicon = (path: string) => {
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'icon';
    link.href = path;
    if (!document.querySelector("link[rel*='icon']")) {
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  };

  const handleAddAgenda = (tasks: string[]) => {
    const newAgenda: Agenda = {
      id: crypto.randomUUID(),
      title: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
      tasks: tasks.map(text => ({ id: crypto.randomUUID(), text, completed: false })),
      createdAt: Date.now()
    };

    // Check for unchecked tasks in the most recent agenda
    if (agendas.length > 0) {
      const lastAgenda = agendas[0];
      const uncheckedTasks = lastAgenda.tasks.filter(t => !t.completed);

      if (uncheckedTasks.length > 0) {
        // Add carried over tasks to the new agenda
        const carriedOverTasks = uncheckedTasks.map(t => ({
          ...t,
          id: crypto.randomUUID(), // New ID for the new agenda
          isCarriedOver: true
        }));

        // We'll add them initially, but we want them to appear with a delay.
        // So we'll filter them out first, then add them back.
        // Actually, a better approach for the "delayed appearance" is to add them but control their visibility via CSS or a temporary state.
        // But based on the requirement "appear after a 1-second delay", let's use a timeout to update the state.

        newAgenda.tasks = [...newAgenda.tasks]; // Start with only new tasks

        setAgendas(prev => [newAgenda, ...prev]);

        setTimeout(() => {
          setAgendas(prev => prev.map(agenda => {
            if (agenda.id === newAgenda.id) {
              return {
                ...agenda,
                tasks: [...agenda.tasks, ...carriedOverTasks]
              };
            }
            return agenda;
          }));
        }, 1000);
        return;
      }
    }

    setAgendas(prev => [newAgenda, ...prev]);
  };

  const handleToggleTask = (agendaId: string, taskId: string) => {
    setAgendas(prev => prev.map(agenda => {
      if (agenda.id !== agendaId) return agenda;
      return {
        ...agenda,
        tasks: agenda.tasks.map(task => {
          if (task.id !== taskId) return task;
          return { ...task, completed: !task.completed };
        })
      };
    }));
  };

  return (
    <div className={`container ${overlayState.visible ? 'rattle' : ''}`}>

      {overlayState.visible && (
        <div className="you-died-overlay">
          <div className={`you-died-text ${overlayState.type === 'success' ? 'overlay-text-success' : ''}`}>
            {overlayState.message}
          </div>
        </div>
      )}

      {/* Show legal pages when navigating to them */}
      {currentPage === 'privacy' ? (
        <PrivacyPolicy />
      ) : currentPage === 'terms' ? (
        <TermsOfService />
      ) : loading ? (
        <div className="auth-container">
          <div className="auth-loading">Loading...</div>
        </div>
      ) : !user || isPasswordRecovery ? (
        <>
          <Auth />
          <Footer />
        </>
      ) : (
        <>
          <Header />

          <main>
            <AddAgenda onAdd={handleAddAgenda} triggerOverlay={triggerOverlay} />

            <AgendaList agendas={agendas} onToggleTask={handleToggleTask} />

            {agendas.length === 0 && (

              <div className="intro-text">

                <h2 className="intro-text-title">Here's what this tool is all about</h2>

                <p className="intro-text-description">You can add an agenda once per day or multiple times a day. If you complete all of it the card turns green. If you do some of it, it turns orange. If you do almost none of it, it turns red. I use this system to see how well my week has been going, feel free to use it yourself as well.</p>
              </div>
            )
            }
          </main >
          <Footer />
        </>
      )}
    </div >
  );
}

export default App;
