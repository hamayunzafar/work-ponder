import React, { useState } from 'react';
import type { Agenda } from '../App';
import { MoreVertical } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AgendaCardProps {
    agenda: Agenda;
    onToggleTask: (agendaId: string, taskId: string) => void;
    onEdit: (agenda: Agenda) => void;
    onDelete: (agendaId: string) => void;
}

export const AgendaCard: React.FC<AgendaCardProps> = ({ agenda, onToggleTask, onEdit, onDelete }) => {
    const { user } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const totalTasks = agenda.tasks.length;
    const completedTasks = agenda.tasks.filter(t => t.completed).length;
    const completionPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    let gradientClass = 'gradient-red'; // Default Red (< 30%)

    if (totalTasks > 0) {
        if (completionPercentage >= 80) {
            gradientClass = 'gradient-green';
        } else if (completionPercentage >= 30) {
            gradientClass = 'gradient-orange';
        }
    }

    return (
        <div className={`orbital-card fade-in agenda-card ${gradientClass}`}>
            <div className="agenda-card-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 className="agenda-card-title">
                        {agenda.title}
                    </h4>
                    
                    {/* Only show menu if we have a user (ownership check is implicit as we only load user's agendas usually, 
                        but if we had public agendas, we'd check user.id === agenda.user_id. 
                        Based on App.tsx, we fetch ALL agendas but filter by user_id on insert. 
                        Wait, fetchAgendas fetches ALL agendas from the table. 
                        If RLS is on, we only see ours. If not, we see everyone's.
                        Let's assume we only want to edit our own.
                    */}
                    {user && (
                        <div style={{ position: 'relative' }}>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowMenu(!showMenu);
                                }}
                                style={{ 
                                    background: 'rgba(0,0,0,0.2)', 
                                    border: 'none', 
                                    borderRadius: '50%', 
                                    width: '24px', 
                                    height: '24px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    color: 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                <MoreVertical size={14} />
                            </button>
                            
                            {showMenu && (
                                <div style={{
                                    position: 'absolute',
                                    top: '100%',
                                    right: 0,
                                    marginTop: '4px',
                                    background: '#1a1a1a',
                                    border: '1px solid #333',
                                    borderRadius: '8px',
                                    padding: '4px',
                                    zIndex: 100,
                                    minWidth: '100px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                                }}>
                                    <button 
                                        onClick={() => {
                                            setShowMenu(false);
                                            onEdit(agenda);
                                        }}
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            textAlign: 'left',
                                            padding: '8px 12px',
                                            background: 'transparent',
                                            border: 'none',
                                            color: 'white',
                                            fontSize: '12px',
                                            fontFamily: 'var(--font-mono)',
                                            cursor: 'pointer',
                                            borderRadius: '4px'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => {
                                            setShowMenu(false);
                                            onDelete(agenda.id);
                                        }}
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            textAlign: 'left',
                                            padding: '8px 12px',
                                            background: 'transparent',
                                            border: 'none',
                                            color: '#ff4444',
                                            fontSize: '12px',
                                            fontFamily: 'var(--font-mono)',
                                            cursor: 'pointer',
                                            borderRadius: '4px'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(227,0,0,0.1)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="agenda-card-stats">
                    {completedTasks}/{totalTasks} Completed
                </div>
            </div>

            <div className="agenda-card-tasks">
                {agenda.tasks.map(task => (
                    <label
                        key={task.id}
                        className={`agenda-task-item ${task.isCarriedOver ? 'blur-slide-in' : ''} ${task.completed ? 'agenda-task-item-completed' : ''}`}
                    >
                        <div className="agenda-task-checkbox-wrapper">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => onToggleTask(agenda.id, task.id)}
                                className="agenda-task-checkbox"
                            />
                            {task.completed && (
                                <svg
                                    viewBox="0 0 14 10"
                                    fill="none"
                                    className="agenda-task-checkbox-icon"
                                >
                                    <path d="M1 5L4.5 8.5L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </div>

                        <div className={`agenda-task-content ${task.completed ? 'completed' : ''}`}>
                            
                            <span className={`agenda-task-text ${task.completed ? 'completed' : ''}`}>
                                {task.text}
                            </span>
                            {task.isCarriedOver && (
                                <span className="agenda-task-carried-label">
                                    Carried Over
                                </span>
                            )}
                        </div>
                    </label>
                ))}
            </div>

            <div className="agenda-card-progress">
                <div className="agenda-card-progress-bar" style={{ width: `${completionPercentage}%` }} />
            </div>
        </div>
    );
};
