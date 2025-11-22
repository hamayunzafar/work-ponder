import React from 'react';
import type { Agenda } from '../App';
import { AgendaCard } from './AgendaCard';

interface AgendaListProps {
    agendas: Agenda[];
    onToggleTask: (agendaId: string, taskId: string) => void;
    onEdit: (agenda: Agenda) => void;
    onDelete: (agendaId: string) => void;
}

export const AgendaList: React.FC<AgendaListProps> = ({ agendas, onToggleTask, onEdit, onDelete }) => {
    if (agendas.length === 0) {
        return null;
    }

    return (
        <div className="agenda-grid">
            {agendas.map((agenda, index) => (
                <div key={agenda.id} className={`agenda-list-item ${index !== 0 ? 'past-agenda' : ''}`}>
                    <AgendaCard 
                        agenda={agenda} 
                        onToggleTask={onToggleTask} 
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </div>
            ))}
        </div>
    );
};
