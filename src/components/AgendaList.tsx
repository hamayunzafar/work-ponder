import React from 'react';
import type { Agenda } from '../App';
import { AgendaCard } from './AgendaCard';

interface AgendaListProps {
    agendas: Agenda[];
    onToggleTask: (agendaId: string, taskId: string) => void;
}

export const AgendaList: React.FC<AgendaListProps> = ({ agendas, onToggleTask }) => {
    if (agendas.length === 0) {
        return null;
    }

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
            padding: '20px 0'
        }}>
            {agendas.map((agenda, index) => (
                <div key={agenda.id} style={{ height: '100%' }} className={index !== 0 ? 'past-agenda' : ''}>
                    <AgendaCard agenda={agenda} onToggleTask={onToggleTask} />
                </div>
            ))}
        </div>
    );
};
