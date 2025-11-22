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
                <h4 className="agenda-card-title">
                    {agenda.title}
                </h4>
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
