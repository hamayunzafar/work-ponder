import React from 'react';

export const Footer: React.FC = () => {
    const handleNavigate = (page: 'privacy' | 'terms') => {
        window.location.hash = page;
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-links">
                    <button onClick={() => handleNavigate('privacy')} className="footer-link">
                        Privacy Policy
                    </button>
                    <span className="footer-divider">•</span>
                    <button onClick={() => handleNavigate('terms')} className="footer-link">
                        Terms of Service
                    </button>
                </div>
                <div className="footer-copyright">
                    © {new Date().getFullYear()} <strong>1THIRTYFIVE INC.</strong> All rights reserved.
                </div>
                <div className="footer-location">
                    Calgary, AB, Canada
                </div>
            </div>
        </footer>
    );
};
