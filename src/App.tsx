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
import { supabase } from './lib/supabase';

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
  const [editingAgenda, setEditingAgenda] = useState<Agenda | null>(null);
  const [overlayState, setOverlayState] = useState<{ visible: boolean; message: string; type: 'error' | 'success' }>({
    visible: false,
    message: '',
    type: 'error'
  });
  const [currentPage, setCurrentPage] = useState<'app' | 'privacy' | 'terms'>('app');

  const { user, loading, isPasswordRecovery } = useAuth();

  // Update document title based on auth state
  useEffect(() => {
    if (!user) {
      document.title = "Workponder is Great";
    } else {
      document.title = "Today's Tasks";
    }
  }, [user]);

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

  const handleAddAgenda = async (tasks: string[]) => {
    if (!user) return;

    if (editingAgenda) {
        // Handle Update
        // 1. Delete existing tasks
        const { error: deleteError } = await supabase
            .from('tasks')
            .delete()
            .eq('agenda_id', editingAgenda.id);

        if (deleteError) {
            console.error('Error deleting old tasks:', deleteError);
            triggerOverlay('Failed to update agenda', 'error');
            return;
        }

        // 2. Insert new tasks
        const tasksToInsert = tasks.map(text => ({
            agenda_id: editingAgenda.id,
            user_id: user.id,
            text,
            completed: false,
            is_carried_over: false
        }));

        const { error: insertError } = await supabase
            .from('tasks')
            .insert(tasksToInsert);

        if (insertError) {
            console.error('Error inserting new tasks:', insertError);
            triggerOverlay('Failed to update agenda', 'error');
        } else {
            await fetchAgendas();
            setEditingAgenda(null);
        }
        return;
    }

    const todayTitle = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    
    // Check if today's agenda already exists
    let targetAgendaId: string | null = null;
    let isNewAgenda = false;

    if (agendas.length > 0) {
      const latestAgenda = agendas[0];
      if (latestAgenda.title === todayTitle) {
        targetAgendaId = latestAgenda.id;
      }
    }

    // If no agenda for today, create one
    if (!targetAgendaId) {
      isNewAgenda = true;
      const { data: agendaData, error: agendaError } = await supabase
        .from('agendas')
        .insert({ title: todayTitle, user_id: user.id })
        .select()
        .single();

      if (agendaError) {
        console.error(agendaError);
        triggerOverlay('Error creating agenda', 'error');
        return;
      }
      targetAgendaId = agendaData.id;
    }

    const tasksToInsert = tasks.map(text => ({
      agenda_id: targetAgendaId,
      user_id: user.id,
      text,
      completed: false,
      is_carried_over: false
    }));

    // Only check for carry-over if it's a BRAND NEW agenda
    if (isNewAgenda && agendas.length > 0) {
      const lastAgenda = agendas[0]; // This is actually the previous day's agenda now, since we haven't refreshed state yet
      // Wait, if we just created a new agenda, 'agendas' state still holds the old list.
      // So agendas[0] is indeed the most recent *previous* agenda.
      
      const uncheckedTasks = lastAgenda.tasks.filter(t => !t.completed);

      if (uncheckedTasks.length > 0) {
        const carriedOverTasks = uncheckedTasks.map(t => ({
          agenda_id: targetAgendaId,
          user_id: user.id,
          text: t.text,
          completed: false,
          is_carried_over: true
        }));

        // Insert new tasks first
        const { error: tasksError } = await supabase.from('tasks').insert(tasksToInsert);
        if (tasksError) {
          console.error(tasksError);
          triggerOverlay('Error adding tasks', 'error');
          return;
        }

        // Refresh to show new agenda
        await fetchAgendas();

        // Delayed insert for carried over tasks
        setTimeout(async () => {
          const { error: carryError } = await supabase.from('tasks').insert(carriedOverTasks);
          if (!carryError) {
            await fetchAgendas();
          }
        }, 1000);
        return;
      }
    }

    // Normal insert (either appending to today's agenda OR new agenda with no carry-over)
    const { error: tasksError } = await supabase.from('tasks').insert(tasksToInsert);
    if (tasksError) {
      console.error(tasksError);
      triggerOverlay('Error adding tasks', 'error');
    } else {
      await fetchAgendas();
    }
  };

  const handleEditAgenda = (agenda: Agenda) => {
      setEditingAgenda(agenda);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteAgenda = async (agendaId: string) => {
      if (!confirm('Are you sure you want to delete this agenda?')) return;

      const { error } = await supabase
          .from('agendas')
          .delete()
          .eq('id', agendaId);

      if (error) {
          console.error('Error deleting agenda:', error);
          triggerOverlay('Failed to delete agenda', 'error');
      } else {
          triggerOverlay('Agenda deleted', 'success');
          await fetchAgendas();
      }
  };

  const handleToggleTask = async (agendaId: string, taskId: string) => {
    // Optimistic update
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

    // DB Update
    const agenda = agendas.find(a => a.id === agendaId);
    const task = agenda?.tasks.find(t => t.id === taskId);
    
    if (task) {
      const { error } = await supabase
        .from('tasks')
        .update({ completed: !task.completed })
        .eq('id', taskId);

      if (error) {
        console.error('Error updating task:', error);
        triggerOverlay('Failed to update task', 'error');
        // Revert state by refetching
        fetchAgendas();
      }
    }
  };

  const fetchAgendas = async () => {
    if (!user) return;

    const { data: agendasData, error: agendasError } = await supabase
      .from('agendas')
      .select('*')
      .order('created_at', { ascending: false });

    if (agendasError) {
      console.error('Error fetching agendas:', agendasError);
      return;
    }

    const { data: tasksData, error: tasksError } = await supabase
      .from('tasks')
      .select('*');

    if (tasksError) {
      console.error('Error fetching tasks:', tasksError);
      return;
    }

    const formattedAgendas: Agenda[] = agendasData.map(agenda => ({
      id: agenda.id,
      title: agenda.title,
      createdAt: new Date(agenda.created_at).getTime(),
      tasks: tasksData
        .filter(task => task.agenda_id === agenda.id)
        .map(task => ({
          id: task.id,
          text: task.text,
          completed: task.completed,
          isCarriedOver: task.is_carried_over
        }))
    }));

    setAgendas(formattedAgendas);
  };

  useEffect(() => {
    if (user) {
      fetchAgendas();
    } else {
      setAgendas([]);
    }
  }, [user]);

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
            <AddAgenda 
              onAdd={handleAddAgenda} 
              triggerOverlay={triggerOverlay} 
              nextTaskNumber={agendas.length > 0 && agendas[0].title === new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) ? agendas[0].tasks.length + 1 : 1}
              initialTasks={editingAgenda ? editingAgenda.tasks.map(t => t.text) : undefined}
              isEditing={!!editingAgenda}
              onCancel={() => setEditingAgenda(null)}
            />

            <AgendaList 
                agendas={agendas} 
                onToggleTask={handleToggleTask} 
                onEdit={handleEditAgenda}
                onDelete={handleDeleteAgenda}
            />

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
