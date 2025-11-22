import React from 'react';

export const PrivacyPolicy: React.FC = () => {
    return (
        <div className="legal-container">
            <div className="legal-content">
                <div className="legal-header">
                    <div className="legal-logo">
                        <div className="header-dot red" />
                        <div className="header-dot green" />
                        <div className="header-dot orange" />
                        <h1 className="legal-logo-title">WORKPONDER</h1>
                    </div>
                    <h1 className="legal-title">Privacy Policy</h1>
                    <p className="legal-subtitle">Last Updated: November 21, 2025</p>
                </div>

                <div className="legal-body">
                    <section className="legal-section">
                        <h2 className="legal-section-title">1. Introduction</h2>
                        <p className="legal-text">
                            This Privacy Policy describes how 1THIRTYFIVE INC. ("Company", "we", "us", or "our") collects, uses, 
                            and discloses your information when you use the WorkPonder task management application (the "Service").
                        </p>
                        <p className="legal-text">
                            By using our Service, you agree to the collection and use of information in accordance with this Privacy Policy.
                        </p>
                        <div className="legal-company-info">
                            <p><strong>1THIRTYFIVE INC.</strong></p>
                            <p>601-1750 29th Street SW</p>
                            <p>Calgary, AB, Canada</p>
                            <p>Email: <a href="mailto:info@1thirtyfive.com" className="legal-link">info@1thirtyfive.com</a></p>
                            <p>Phone: <a href="tel:+18257340775" className="legal-link">+1 (825) 734-0775</a></p>
                        </div>
                    </section>

                    <section className="legal-section">
                        <h2 className="legal-section-title">2. Information We Collect</h2>
                        <h3 className="legal-subsection-title">2.1 Personal Information</h3>
                        <p className="legal-text">
                            When you create an account, we collect:
                        </p>
                        <ul className="legal-list">
                            <li>Email address</li>
                            <li>Password (encrypted)</li>
                            <li>Account creation date</li>
                        </ul>

                        <h3 className="legal-subsection-title">2.2 Usage Data</h3>
                        <p className="legal-text">
                            We automatically collect certain information when you use our Service:
                        </p>
                        <ul className="legal-list">
                            <li>Task and agenda data you create</li>
                            <li>Timestamps of when tasks are created and completed</li>
                            <li>Browser type and version</li>
                            <li>Device information</li>
                            <li>IP address</li>
                            <li>Session duration and interaction data</li>
                        </ul>

                        <h3 className="legal-subsection-title">2.3 Cookies and Tracking Technologies</h3>
                        <p className="legal-text">
                            We use cookies and similar tracking technologies to track activity on our Service and store certain information. 
                            Cookies are files with small amount of data which may include an anonymous unique identifier.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2 className="legal-section-title">3. How We Use Your Information</h2>
                        <p className="legal-text">We use the collected data for various purposes:</p>
                        <ul className="legal-list">
                            <li>To provide and maintain our Service</li>
                            <li>To notify you about changes to our Service</li>
                            <li>To allow you to participate in interactive features when you choose to do so</li>
                            <li>To provide customer support</li>
                            <li>To gather analysis or valuable information to improve our Service</li>
                            <li>To monitor the usage of our Service</li>
                            <li>To detect, prevent, and address technical issues</li>
                            <li>To send you email confirmations and password reset links</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2 className="legal-section-title">4. Data Storage and Security</h2>
                        <p className="legal-text">
                            Your data is stored securely using Supabase, a third-party cloud database provider. We implement appropriate 
                            technical and organizational measures to protect your personal information against unauthorized or unlawful 
                            processing, accidental loss, destruction, or damage.
                        </p>
                        <p className="legal-text">
                            However, please note that no method of transmission over the Internet or electronic storage is 100% secure. 
                            While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee 
                            its absolute security. <strong>1THIRTYFIVE INC. SHALL NOT BE LIABLE FOR ANY UNAUTHORIZED ACCESS TO OR USE OF 
                            YOUR PERSONAL INFORMATION.</strong>
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2 className="legal-section-title">5. Third-Party Services</h2>
                        <p className="legal-text">
                            We use the following third-party service providers:
                        </p>
                        <ul className="legal-list">
                            <li><strong>Supabase:</strong> For authentication, database, and cloud storage services. Supabase has its own 
                            privacy policy and terms of service.</li>
                        </ul>
                        <p className="legal-text">
                            These third-party providers have access to your personal information only to perform specific tasks on our behalf 
                            and are obligated not to disclose or use it for any other purpose. <strong>WE ARE NOT RESPONSIBLE FOR THE PRIVACY 
                            PRACTICES OF THIRD-PARTY SERVICE PROVIDERS.</strong>
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2 className="legal-section-title">6. Data Retention</h2>
                        <p className="legal-text">
                            We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy 
                            Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, 
                            resolve disputes, and enforce our policies.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2 className="legal-section-title">7. Your Data Protection Rights</h2>
                        <p className="legal-text">
                            Depending on your location, you may have the following rights regarding your personal information:
                        </p>
                        <ul className="legal-list">
                            <li><strong>Right to Access:</strong> You have the right to request copies of your personal data.</li>
                            <li><strong>Right to Rectification:</strong> You have the right to request that we correct any information you 
                            believe is inaccurate or incomplete.</li>
                            <li><strong>Right to Erasure:</strong> You have the right to request that we erase your personal data, under 
                            certain conditions.</li>
                            <li><strong>Right to Restrict Processing:</strong> You have the right to request that we restrict the processing 
                            of your personal data, under certain conditions.</li>
                            <li><strong>Right to Data Portability:</strong> You have the right to request that we transfer the data that we 
                            have collected to another organization, or directly to you, under certain conditions.</li>
                        </ul>
                        <p className="legal-text">
                            To exercise any of these rights, please contact us at <a href="mailto:info@1thirtyfive.com" className="legal-link">
                            info@1thirtyfive.com</a>.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2 className="legal-section-title">8. Children's Privacy</h2>
                        <p className="legal-text">
                            Our Service is not intended for use by children under the age of 13. We do not knowingly collect personally 
                            identifiable information from children under 13. If you are a parent or guardian and you are aware that your child 
                            has provided us with personal information, please contact us so that we can take necessary actions.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2 className="legal-section-title">9. Changes to This Privacy Policy</h2>
                        <p className="legal-text">
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy 
                            Policy on this page and updating the "Last Updated" date.
                        </p>
                        <p className="legal-text">
                            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are 
                            effective when they are posted on this page. <strong>YOUR CONTINUED USE OF THE SERVICE AFTER ANY SUCH CHANGES 
                            CONSTITUTES YOUR ACCEPTANCE OF THE NEW PRIVACY POLICY.</strong>
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2 className="legal-section-title">10. Limitation of Liability</h2>
                        <p className="legal-text">
                            <strong>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, 1THIRTYFIVE INC. SHALL NOT BE LIABLE FOR ANY INDIRECT, 
                            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED 
                            DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM: (A) YOUR 
                            ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (B) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SERVERS 
                            AND/OR ANY PERSONAL INFORMATION STORED THEREIN; (C) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE THAT MAY BE 
                            TRANSMITTED TO OR THROUGH OUR SERVICE BY ANY THIRD PARTY.</strong>
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2 className="legal-section-title">11. Governing Law</h2>
                        <p className="legal-text">
                            This Privacy Policy shall be governed and construed in accordance with the laws of the Province of Alberta, Canada, 
                            without regard to its conflict of law provisions.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2 className="legal-section-title">12. Contact Us</h2>
                        <p className="legal-text">
                            If you have any questions about this Privacy Policy, please contact us:
                        </p>
                        <div className="legal-company-info">
                            <p><strong>1THIRTYFIVE INC.</strong></p>
                            <p>601-1750 29th Street SW</p>
                            <p>Calgary, AB, Canada</p>
                            <p>Email: <a href="mailto:info@1thirtyfive.com" className="legal-link">info@1thirtyfive.com</a></p>
                            <p>Phone: <a href="tel:+18257340775" className="legal-link">+1 (825) 734-0775</a></p>
                        </div>
                    </section>
                </div>

                <button 
                    onClick={() => window.history.back()} 
                    className="legal-back-btn"
                >
                    ← Back
                </button>
            </div>
        </div>
    );
};
