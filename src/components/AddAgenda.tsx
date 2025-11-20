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
        <div className="add-agenda-section" style={{
            maxWidth: '600px',
            width: '100%',
            margin: '4px auto 40px',
            // background: '#111',
            background: 'linear-gradient(95deg, #363636 0%, #212121 25%, #1A1A1A 48.56%, #212121 77.43%)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid #333',
            padding: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            transition: 'all 0.3s var(--transition-bezier)'
        }}>
            {!isExpanded ? (
                <button
                    onClick={() => setIsExpanded(true)}
                    style={{
                        width: '100%',
                        textAlign: 'left',
                        fontSize: '16px',
                        color: '#888',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontFamily: 'var(--font-mono)'
                    }}
                >
                    <span>Start a new agenda...</span>
                    <span style={{
                        background: '#333',
                        color: 'white',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px'
                    }}>+</span>
                </button>
            ) : (
                <div className="fade-in">
                    <div style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#888',
                        paddingBottom: '8px',
                        // borderBottom: '1px solid #333',
                        fontFamily: 'var(--font-mono)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                        {tasks.map((task, index) => (
                            <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    placeholder={`Task ${index + 1}`}
                                    value={task}
                                    onChange={(e) => handleTaskChange(index, e.target.value)}
                                    style={{ flex: 1 }}
                                    autoFocus={index === tasks.length - 1}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            addTaskInput();
                                        }
                                    }}
                                />
                                <button
                                    onClick={() => removeTaskInput(index)}
                                    style={{ color: '#555', padding: '4px' }}
                                    title="Remove task"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={addTaskInput}
                            style={{
                                alignSelf: 'flex-start',
                                color: '#8EC5FC',
                                fontWeight: 600,
                                fontSize: '12px',
                                marginTop: '8px',
                                fontFamily: 'var(--font-mono)',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}
                        >
                            + Add Segment
                        </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                        <button
                            onClick={() => setIsExpanded(false)}
                            style={{
                                padding: '10px 20px',
                                fontWeight: 600,
                                color: '#888',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '12px',
                                textTransform: 'uppercase'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            // disabled={tasks.every(t => !t.trim())}
                            style={{
                                background: 'white',
                                color: 'black',
                                padding: '10px 24px',
                                borderRadius: 'var(--radius-pill)',
                                fontWeight: 700,
                                fontFamily: 'var(--font-mono)',
                                fontSize: '12px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                opacity: (tasks.every(t => !t.trim())) ? 0.5 : 1,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            Confirm Trip <span style={{ opacity: 0.5, fontSize: '10px' }}>⌘↵</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
