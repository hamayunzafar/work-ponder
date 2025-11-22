import React, { useState, useEffect } from 'react';
import { Command, CornerDownLeft } from 'lucide-react';

interface AddAgendaProps {
    onAdd: (tasks: string[]) => void;
    triggerOverlay: (message: string, type: 'error' | 'success') => void;
    nextTaskNumber?: number;
    initialTasks?: string[];
    isEditing?: boolean;
    onCancel?: () => void;
}

export const AddAgenda: React.FC<AddAgendaProps> = ({ 
    onAdd, 
    triggerOverlay, 
    nextTaskNumber = 1,
    initialTasks,
    isEditing = false,
    onCancel
}) => {
    const [tasks, setTasks] = useState<string[]>(['']);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (initialTasks && initialTasks.length > 0) {
            setTasks(initialTasks);
            setIsExpanded(true);
        }
    }, [initialTasks]);

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
        if (!isEditing) {
            triggerOverlay("💦 AGENDA ADDED", 'success');
            setTasks(['']);
            setIsExpanded(false);
        } else {
            triggerOverlay("✨ AGENDA UPDATED", 'success');
            // Don't clear tasks immediately if editing, let parent handle it or keep it open?
            // Usually we want to close it.
            setTasks(['']);
            setIsExpanded(false);
        }
    };

    // Calculate the starting task number based on existing tasks for today
    // We need to pass the current task count from the parent or fetch it, but for now let's just use local index + 1
    // Actually, to have continuity, we need to know how many tasks are already in today's agenda.
    // Since we don't have that prop passed down yet, I'll stick to local index for now, 
    // but the user asked for continuity. Let's update the props to accept `nextTaskNumber`.

    return (
        <div className="add-agenda-section">
            {!isExpanded ? (
                <button
                    onClick={() => setIsExpanded(true)}
                    className="add-agenda-button"
                >
                    <span>{isEditing ? 'Edit tasks...' : "Add today's tasks..."}</span>
                    <span className="add-agenda-button-icon">{isEditing ? '✎' : '+'}</span>
                </button>
            ) : (
                <div className="fade-in">
                    <div className="add-agenda-date">
                        {isEditing ? 'Editing Agenda' : new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </div>

                    <div className="add-agenda-tasks">
                        {tasks.map((task, index) => (
                            <div key={index} className="add-agenda-task-row">
                                <input
                                    type="text"
                                    placeholder={`Task ${nextTaskNumber + index}`}
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
                            onClick={() => {
                                setIsExpanded(false);
                                if (onCancel) onCancel();
                                setTasks(['']);
                            }}
                            className="add-agenda-cancel-btn"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className={`add-agenda-submit-btn ${tasks.every(t => !t.trim()) ? 'disabled' : ''}`}
                        >
                            {isEditing ? 'Confirm edits' : 'Create tasks'} <span className="add-agenda-shortcut">
                                <Command size={14} strokeWidth={2} />
                                <CornerDownLeft size={14} strokeWidth={2} />
                            </span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
