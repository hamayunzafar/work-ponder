import { useState } from 'react';
import './index.css';
import { Header } from './components/Header';
import { AddAgenda } from './components/AddAgenda';
import { AgendaList } from './components/AgendaList';

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

  const triggerOverlay = (message: string, type: 'error' | 'success') => {
    setOverlayState({ visible: true, message, type });
    setTimeout(() => {
      setOverlayState(prev => ({ ...prev, visible: false }));
    }, 2500);
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
      <Header />

      <main>
        <AddAgenda onAdd={handleAddAgenda} triggerOverlay={triggerOverlay} />

        <AgendaList agendas={agendas} onToggleTask={handleToggleTask} />

        {agendas.length === 0 && (

          <div id='intro-text' style={{ 
            textAlign: 'center', 
            color: '#ffffffff', 
            opacity: 0.6, 
            maxWidth: '600px', 
            margin: '0 auto', 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', justifyContent: 'center' }}>

            <h2 style={{ marginBottom: '12px', fontFamily: 'monospace', fontSize: '24px' }}>Here's what this tool is all about</h2>

            <p style={{ fontFamily: 'monospace' }}>You can add an agenda once per day or multiple times a day. If you complete all of it the card turns green. If you do some of it, it turns orange. If you do almost none of it, it turns red. I use this system to see how well my week has been going, feel free to use it yourself as well.</p>
          </div>
        )
        }
      </main >
    </div >
  );
}

export default App;
