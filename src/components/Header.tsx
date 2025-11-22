
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const Header: React.FC = () => {
    const { user, signOut } = useAuth();
    const [showMenu, setShowMenu] = useState(false);

    const handleSignOut = async () => {
        await signOut();
        setShowMenu(false);
    };

    return (
        <header className="header">
            <div className="header-content">
                <div className="header-dot red" />
                <div className="header-dot green" />
                <div className="header-dot orange" />

                <h1 className="header-title">
                    WorkPonder
                </h1>
            </div>

            {user && (
                <div className="header-user-menu">
                    <button 
                        className="header-user-button"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <div className="header-user-avatar">
                            {user.email?.[0].toUpperCase()}
                        </div>
                        <span className="header-user-email">{user.email}</span>
                    </button>

                    {showMenu && (
                        <div className="header-dropdown">
                            <button onClick={handleSignOut} className="header-dropdown-item">
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

