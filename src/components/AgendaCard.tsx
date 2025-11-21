import React from 'react';
import type { Agenda } from '../App';

interface AgendaCardProps {
    agenda: Agenda;
    onToggleTask: (agendaId: string, taskId: string) => void;
}

export const AgendaCard: React.FC<AgendaCardProps> = ({ agenda, onToggleTask }) => {
    const totalTasks = agenda.tasks.length;
    const completedTasks = agenda.tasks.filter(t => t.completed).length;
    const completionPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    let gradient = 'radial-gradient(141.42% 141.42% at 0% 0%, #3F3F3F 0%, #1C1212 73.08%, #E30000 100%)'; // Default Red (< 30%)

    if (totalTasks > 0) {
        if (completionPercentage >= 80) {
            // Green (80-100%)
            gradient = 'radial-gradient(141.42% 141.42% at 0% 0%, #3F3F3F 0%, #121C15 73.08%, #00E33D 100%)';
        } else if (completionPercentage >= 30) {
            // Orange (30-79%)
            gradient = 'radial-gradient(141.42% 141.42% at 0% 0%, #3F3F3F 0%, #1C1812 73.08%, #E38800 100%)';
        }
    }

    return (
        <div className="orbital-card fade-in" style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0px 20px 10px -10px rgb(0 0 0 / 0.8)',
            transition: 'transform 0.3s var(--transition-bezier)',
            background: gradient
        }}>
            {/* Decorative dots */}
            <div style={{ marginTop: '12px', marginBottom: '30px' }}>
                <h4 style={{
                    fontSize: '18px',
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: '-0.8px',
                    marginBottom: '8px'
                }}>
                    {agenda.title}
                </h4>
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    opacity: 0.6,
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                    {completedTasks}/{totalTasks} Completed
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                {agenda.tasks.map(task => (
                    <label
                        key={task.id}
                        className={task.isCarriedOver ? 'blur-slide-in' : ''}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            cursor: 'pointer',
                            transition: 'opacity 0.2s ease',
                            background: 'rgba(255,255,255,0.2)',
                            padding: '12px 16px',
                            borderRadius: '16px',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <div style={{ position: 'relative', width: '24px', height: '24px', flexShrink: 0 }}>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => onToggleTask(agenda.id, task.id)}
                                style={{
                                    appearance: 'none',
                                    width: '100%',
                                    height: '100%',
                                    border: '2px solid rgba(0,0,0,0.4)',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    background: task.completed ? '#000' : 'transparent',
                                    borderColor: task.completed ? '#000' : 'rgba(0,0,0,0.4)',
                                    transition: 'all 0.2s var(--transition-bezier)',
                                    opacity: task.completed ? 0.3 : 1,
                                    margin: 0,
                                    padding: 0
                                }}
                            />
                            {task.completed && (
                                <svg
                                    viewBox="0 0 14 10"
                                    fill="none"
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '12px',
                                        height: '10px',
                                        pointerEvents: 'none'
                                    }}
                                >
                                    <path d="M1 5L4.5 8.5L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, opacity: task.completed ? 0.4 : 1 }}>
                            
                            <span style={{
                                fontSize: '16px',
                                fontWeight: 600,
                                textDecoration: task.completed ? 'line-through' : 'none',
                            }}>
                                {task.text}
                            </span>
                            {task.isCarriedOver && (
                                <span style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '10px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    color: '#000',
                                    marginTop: '4px'
                                }}>
                                    Carried Over
                                </span>
                            )}
                        </div>
                    </label>
                ))}
            </div>

            {/* Progress Bar */}
            <div style={{
                marginTop: '30px',
                height: '4px',
                background: 'rgba(0,0,0,0.1)',
                borderRadius: '2px',
                overflow: 'hidden'
            }}>
                <div style={{
                    height: '100%',
                    width: `${completionPercentage}%`,
                    background: '#000',
                    transition: 'width 0.5s var(--transition-bezier)'
                }} />
            </div>
        </div>
    );
};
