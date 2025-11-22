import React from 'react';

export const TermsOfService: React.FC = () => {
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
                    <h1 className="legal-title">Terms of Service</h1>
                    <p className="legal-subtitle">Last Updated: November 21, 2025</p>
                </div>

                <div className="legal-body">
                    <section className="legal-section">
                        <h2 className="legal-section-title">1. Agreement to Terms</h2>
                        <p className="legal-text">
                            These Terms of Service ("Terms") constitute a legally binding agreement between you and 1THIRTYFIVE INC. 
                            ("Company", "we", "us", or "our") regarding your use of the WorkPonder task management application (the "Service").
                        </p>
                        <p className="legal-text">
                            <strong>BY ACCESSING OR USING THE SERVICE, YOU AGREE TO BE BOUND BY THESE TERMS. IF YOU DO NOT AGREE TO THESE 
                            TERMS, DO NOT USE THE SERVICE.</strong>
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
                        <h2 className="legal-section-title">2. Description of Service</h2>
                        <p className="legal-text">
                            WorkPonder is a task management application that allows users to create daily agendas, track task completion, 
                            and monitor their productivity. The Service is provided "AS IS" and "AS AVAILABLE" without any warranties of 
                            any kind.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2 className="legal-section-title">3. User Accounts</h2>
                        <h3 className="legal-subsection-title">3.1 Account Creation</h3>
                        <p className="legal-text">
                            To use certain features of the Service, you must create an account. You agree to:
                        </p>
                        <ul className="legal-list">
                            <li>Provide accurate, current, and complete information during registration</li>
                            <li>Maintain and promptly update your account information</li>
                            <li>Maintain the security of your password and accept all risks of unauthorized access</li>
                            <li>Immediately notify us of any unauthorized use of your account</li>
                        </ul>

                        <h3 className="legal-subsection-title">3.2 Account Eligibility</h3>
                        <p className="legal-text">
                            You must be at least 13 years old to use the Service. By using the Service, you represent and warrant that you 
                            meet this age requirement.
                        </p>

                        <h3 className="legal-subsection-title">3.3 Account Termination</h3>
                        <p className="legal-text">
                            We reserve the right to suspend or terminate your account at any time, with or without cause, and with or without 
                            notice. <strong>YOU ACKNOWLEDGE THAT 1THIRTYFIVE INC. SHALL NOT BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY 
                            TERMINATION OF YOUR ACCESS TO THE SERVICE.</strong>
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2 className="legal-section-title">4. Acceptable Use Policy</h2>
                        <p className="legal-text">
                            You agree NOT to use the Service to:
                        </p>
                        <ul className="legal-list">
                            <li>Violate any applicable laws or regulations</li>
                            <li>Infringe upon the intellectual property rights of others</li>
                            <li>Transmit any harmful, offensive, or illegal content</li>
                            <li>Interfere with or disrupt the Service or servers</li>
                            <li>Attempt to gain unauthorized access to any portion of the Service</li>
                            <li>Use the Service for any commercial purpose without our prior written consent</li>
                            <li>Reverse engineer, decompile, or disassemble any portion of the Service</li>
                            <li>Use any automated means (bots, scrapers, etc.) to access the Service</li>
                            <li>Impersonate any person or entity</li>
                            <li>Collect or harvest any information from the Service</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2 className="legal-section-title">5. Intellectual Property Rights</h2>
                        <h3 className="legal-subsection-title">5.1 Company Property</h3>
                        <p className="legal-text">
                            The Service and its entire contents, features, and functionality (including but not limited to all information, 
                            software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned 
                            by 1THIRTYFIVE INC., its licensors, or other providers of such material and are protected by Canadian and 
                            international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                        </p>
                        <p className="legal-text">
                            <strong>ALL RIGHTS, TITLE, AND INTEREST IN AND TO THE SERVICE ARE AND WILL REMAIN THE EXCLUSIVE PROPERTY OF 
                            1THIRTYFIVE INC.</strong>
                        </p>

                        <h3 className="legal-subsection-title">5.2 User Content</h3>
                        <p className="legal-text">
                            You retain ownership of any tasks, agendas, or other content you create using the Service ("User Content"). 
                            However, by creating User Content, you grant 1THIRTYFIVE INC. a worldwide, non-exclusive, royalty-free, transferable 
                            license to use, reproduce, distribute, prepare derivative works of, display, and perform the User Content in 
                            connection with the Service.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2 className="legal-section-title">6. DISCLAIMER OF WARRANTIES</h2>
                        <p className="legal-text">
                            <strong>THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND, 
                            WHETHER EXPRESS, IMPLIED, OR STATUTORY. TO THE FULLEST EXTENT PERMITTED BY LAW, 1THIRTYFIVE INC. DISCLAIMS ALL 
                            WARRANTIES, INCLUDING BUT NOT LIMITED TO:</strong>
                        </p>
                        <ul className="legal-list">
                            <li><strong>IMPLIED WARRANTIES OF MERCHANTABILITY</strong></li>
                            <li><strong>FITNESS FOR A PARTICULAR PURPOSE</strong></li>
                            <li><strong>NON-INFRINGEMENT</strong></li>
                            <li><strong>ACCURACY, RELIABILITY, OR AVAILABILITY OF THE SERVICE</strong></li>
                            <li><strong>THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE</strong></li>
                            <li><strong>THAT ANY DEFECTS OR ERRORS WILL BE CORRECTED</strong></li>
                        </ul>
                        <p className="legal-text">
                            <strong>YOU ACKNOWLEDGE THAT YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK. 1THIRTYFIVE INC. MAKES NO WARRANTY 
                            THAT THE SERVICE WILL MEET YOUR REQUIREMENTS OR EXPECTATIONS.</strong>
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2 className="legal-section-title">7. LIMITATION OF LIABILITY</h2>
                        <p className="legal-text">
                            <strong>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL 1THIRTYFIVE INC., ITS DIRECTORS, 
                            OFFICERS, EMPLOYEES, AGENTS, PARTNERS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY:</strong>
                        </p>
                        <ul className="legal-list">
                            <li><strong>INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES</strong></li>
                            <li><strong>LOSS OF PROFITS, REVENUE, DATA, OR USE</strong></li>
                            <li><strong>LOSS OF OR DAMAGE TO PROPERTY</strong></li>
                            <li><strong>BUSINESS INTERRUPTION</strong></li>
                            <li><strong>PERSONAL INJURY OR PROPERTY DAMAGE</strong></li>
                            <li><strong>LOSS OF GOODWILL OR REPUTATION</strong></li>
                        </ul>
                        <p className="legal-text">
                            <strong>WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), PRODUCT LIABILITY, OR ANY OTHER LEGAL 
                            THEORY, AND WHETHER OR NOT 1THIRTYFIVE INC. HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</strong>
                        </p>
                        <p className="legal-text">
                            <strong>IN NO EVENT SHALL THE TOTAL LIABILITY OF 1THIRTYFIVE INC. TO YOU FOR ALL DAMAGES, LOSSES, AND CAUSES OF 
                            ACTION EXCEED THE AMOUNT YOU PAID TO 1THIRTYFIVE INC. IN THE LAST TWELVE (12) MONTHS, OR ONE HUNDRED DOLLARS 
                            ($100.00), WHICHEVER IS LESS.</strong>
                        </p>
                        <p className="legal-text">
                            <strong>SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE 
                            ABOVE LIMITATIONS OR EXCLUSIONS MAY NOT APPLY TO YOU. IN SUCH JURISDICTIONS, 1THIRTYFIVE INC.'S LIABILITY SHALL BE 
                            LIMITED TO THE GREATEST EXTENT PERMITTED BY LAW.</strong>
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2 className="legal-section-title">8. INDEMNIFICATION</h2>
                        <p className="legal-text">
                            <strong>YOU AGREE TO DEFEND, INDEMNIFY, AND HOLD HARMLESS 1THIRTYFIVE INC., ITS DIRECTORS, OFFICERS, EMPLOYEES, 
                            AGENTS, PARTNERS, SUPPLIERS, AND AFFILIATES FROM AND AGAINST ANY AND ALL CLAIMS, DAMAGES, OBLIGATIONS, LOSSES, 
                            LIABILITIES, COSTS, OR DEBT, AND EXPENSES (INCLUDING BUT NOT LIMITED TO ATTORNEY'S FEES) ARISING FROM:</strong>
                        </p>
                        <ul className="legal-list">
                            <li><strong>YOUR USE OF AND ACCESS TO THE SERVICE</strong></li>
                            <li><strong>YOUR VIOLATION OF ANY TERM OF THESE TERMS</strong></li>
                            <li><strong>YOUR VIOLATION OF ANY THIRD-PARTY RIGHT, INCLUDING WITHOUT LIMITATION ANY COPYRIGHT, PROPERTY, OR 
                            PRIVACY RIGHT</strong></li>
                            <li><strong>ANY CLAIM THAT YOUR USER CONTENT CAUSED DAMAGE TO A THIRD PARTY</strong></li>
                        </ul>
                        <p className="legal-text">
                            <strong>THIS INDEMNIFICATION OBLIGATION WILL SURVIVE THE TERMINATION OR EXPIRATION OF THESE TERMS AND YOUR USE 
                            OF THE SERVICE.</strong>
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2 className="legal-section-title">9. Data Loss and Backups</h2>
                        <p className="legal-text">
                            <strong>YOU ARE SOLELY RESPONSIBLE FOR BACKING UP YOUR USER CONTENT. 1THIRTYFIVE INC. SHALL NOT BE LIABLE FOR ANY 
                            LOSS OR CORRUPTION OF YOUR DATA, OR FOR ANY COSTS OR EXPENSES ASSOCIATED WITH BACKING UP OR RESTORING ANY OF YOUR 
                            DATA. WE DO NOT GUARANTEE THAT YOUR DATA WILL BE PRESERVED OR BACKED UP.</strong>
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2 className="legal-section-title">10. Third-Party Services</h2>
                        <p className="legal-text">
                            The Service may contain links to third-party websites or services that are not owned or controlled by 1THIRTYFIVE INC. 
                            We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any 
                            third-party websites or services.
                        </p>
                        <p className="legal-text">
                            <strong>YOU ACKNOWLEDGE AND AGREE THAT 1THIRTYFIVE INC. SHALL NOT BE RESPONSIBLE OR LIABLE, DIRECTLY OR INDIRECTLY, 
                            FOR ANY DAMAGE OR LOSS CAUSED OR ALLEGED TO BE CAUSED BY OR IN CONNECTION WITH THE USE OF OR RELIANCE ON ANY SUCH 
                            THIRD-PARTY CONTENT, GOODS, OR SERVICES AVAILABLE ON OR THROUGH ANY SUCH WEBSITES OR SERVICES.</strong>
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2 className="legal-section-title">11. Modifications to Service</h2>
                        <p className="legal-text">
                            We reserve the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with 
                            or without notice. <strong>YOU AGREE THAT 1THIRTYFIVE INC. SHALL NOT BE LIABLE TO YOU OR TO ANY THIRD PARTY FOR 
                            ANY MODIFICATION, SUSPENSION, OR DISCONTINUANCE OF THE SERVICE.</strong>
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2 className="legal-section-title">12. Changes to Terms</h2>
                        <p className="legal-text">
                            We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms 
                            on this page and updating the "Last Updated" date.
                        </p>
                        <p className="legal-text">
                            <strong>YOUR CONTINUED USE OF THE SERVICE AFTER ANY SUCH CHANGES CONSTITUTES YOUR ACCEPTANCE OF THE NEW TERMS. 
                            IF YOU DO NOT AGREE TO THE MODIFIED TERMS, YOU MUST STOP USING THE SERVICE.</strong>
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2 className="legal-section-title">13. Governing Law and Jurisdiction</h2>
                        <p className="legal-text">
                            These Terms shall be governed and construed in accordance with the laws of the Province of Alberta, Canada, 
                            without regard to its conflict of law provisions.
                        </p>
                        <p className="legal-text">
                            Any legal action or proceeding arising under these Terms will be brought exclusively in the courts located in 
                            Calgary, Alberta, Canada, and you irrevocably consent to personal jurisdiction and venue therein.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2 className="legal-section-title">14. Severability</h2>
                        <p className="legal-text">
                            If any provision of these Terms is held to be invalid, illegal, or unenforceable, the validity, legality, and 
                            enforceability of the remaining provisions shall not in any way be affected or impaired.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2 className="legal-section-title">15. Entire Agreement</h2>
                        <p className="legal-text">
                            These Terms, together with our Privacy Policy, constitute the entire agreement between you and 1THIRTYFIVE INC. 
                            regarding the Service and supersede all prior and contemporaneous understandings, agreements, representations, 
                            and warranties.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2 className="legal-section-title">16. Contact Information</h2>
                        <p className="legal-text">
                            If you have any questions about these Terms, please contact us:
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
