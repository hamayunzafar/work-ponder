import React, { useState, useEffect } from 'react';

interface AddAgendaProps {
    onAdd: (tasks: string[]) => void;
    triggerOverlay: (message: string, type: 'error' | 'success') => void;
}

export const AddAgenda: React.FC<AddAgendaProps> = ({ onAdd, triggerOverlay }) => {
    const [tasks, setTasks] = useState<string[]>(['']);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && isExpanded) {
                handleSubmit();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [tasks, isExpanded]);

    const handleTaskChange = (index: number, value: string) => {
        const newTasks = [...tasks];
        newTasks[index] = value;
        setTasks(newTasks);
    };

    const addTaskInput = () => {
        setTasks([...tasks, '']);
    };

    const removeTaskInput = (index: number) => {
        if (tasks.length === 1) {
            setTasks(['']);
            return;
        }
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    const handleSubmit = () => {
        const validTasks = tasks.filter(t => t.trim() !== '');
        if (validTasks.length === 0) {
            triggerOverlay("NAH, ADD A TASK FIRST", 'error');
            return;
        }
        onAdd(validTasks);
        triggerOverlay("💦 AGENDA ADDED", 'success');
        setTasks(['']);
        setIsExpanded(false);
    };

    return (
        <div className="add-agenda-section">
            {!isExpanded ? (
                <button
                    onClick={() => setIsExpanded(true)}
                    className="add-agenda-button"
                >
                    <span>Start a new agenda...</span>
                    <span className="add-agenda-button-icon">+</span>
                </button>
            ) : (
                <div className="fade-in">
                    <div className="add-agenda-date">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </div>

                    <div className="add-agenda-tasks">
                        {tasks.map((task, index) => (
                            <div key={index} className="add-agenda-task-row">
                                <input
                                    type="text"
                                    placeholder={`Task ${index + 1}`}
                                    value={task}
                                    onChange={(e) => handleTaskChange(index, e.target.value)}
                                    className="add-agenda-task-input"
                                    autoFocus={index === tasks.length - 1}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            addTaskInput();
                                        }
                                    }}
                                />
                                <button
                                    onClick={() => removeTaskInput(index)}
                                    className="add-agenda-remove-btn"
                                    title="Remove task"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={addTaskInput}
                            className="add-agenda-add-task-btn"
                        >
                            + Add Task
                        </button>
                    </div>

                    <div className="add-agenda-actions">
                        <button
                            onClick={() => setIsExpanded(false)}
                            className="add-agenda-cancel-btn"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className={`add-agenda-submit-btn ${tasks.every(t => !t.trim()) ? 'disabled' : ''}`}
                        >
                            Create Agenda (CMD + Enter)
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
