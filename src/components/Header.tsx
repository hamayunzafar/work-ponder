import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import hsocCta from '../assets/HSOC-CTA.svg';
import hsocCta64 from '../assets/HSOC-CTA-64.svg';
import Lottie from 'lottie-react';
import streaksAnimation from '../assets/streaks-lottie.json';
import { StreamDrawer } from './StreamDrawer';
import { Tooltip } from './Tooltip';

export const Header: React.FC = () => {
    const { user, signOut } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const [isStreamOpen, setIsStreamOpen] = useState(false);

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
                <div className="header-actions">
                    <Tooltip content="Editor's Stream of Conscience" position="bottom">
                        <div 
                            className="hsoc-cta-container" 
                            onClick={() => setIsStreamOpen(true)}
                            style={{ cursor: 'pointer' }}
                        >
                            <picture style={{ height: '100%', display: 'block' }}>
                                <source media="(max-width: 440px)" srcSet={hsocCta64} />
                                <img src={hsocCta} alt="HSOC CTA" className="hsoc-cta" />
                            </picture>
                            <div className="hsoc-lottie-wrapper">
                                <Lottie animationData={streaksAnimation} loop={true} className="hsoc-lottie-anim" />
                            </div>
                        </div>
                    </Tooltip>
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
                </div>
            )}

            <StreamDrawer 
                isOpen={isStreamOpen} 
                onClose={() => setIsStreamOpen(false)} 
            />
        </header>
    );
};

