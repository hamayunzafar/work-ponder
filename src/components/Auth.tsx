import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Eye, EyeOff } from 'lucide-react'

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { signUp, signIn, resetPassword, updatePassword, isPasswordRecovery } = useAuth()

  // Show reset password form when in recovery mode
  useEffect(() => {
    // No need to check URL hash anymore, the context handles it
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    if (isForgotPassword) {
      // Handle forgot password
      const { error } = await resetPassword(email)
      if (error) {
        setMessage({ type: 'error', text: error.message })
      } else {
        setMessage({ 
          type: 'success', 
          text: '🔥 CHECK YOUR EMAIL! Reset link sent!' 
        })
        setEmail('')
      }
    } else if (isPasswordRecovery) {
      // Handle new password update
      if (newPassword !== confirmPassword) {
        setMessage({ type: 'error', text: 'Passwords do not match!' })
        setLoading(false)
        return
      }
      if (newPassword.length < 6) {
        setMessage({ type: 'error', text: 'Password must be at least 6 characters!' })
        setLoading(false)
        return
      }
      const { error } = await updatePassword(newPassword)
      if (error) {
        setMessage({ type: 'error', text: error.message })
      } else {
        setMessage({ 
          type: 'success', 
          text: '✅ PASSWORD UPDATED! Redirecting...' 
        })
        setTimeout(() => {
          setNewPassword('')
          setConfirmPassword('')
          window.location.hash = ''
          window.location.reload()
        }, 2000)
      }
    } else if (isSignUp) {
      const { error } = await signUp(email, password)
      if (error) {
        setMessage({ type: 'error', text: error.message })
      } else {
        setMessage({ 
          type: 'success', 
          text: '🔥 CHECK YOUR EMAIL! Confirmation link sent!' 
        })
        setEmail('')
        setPassword('')
      }
    } else {
      const { error } = await signIn(email, password)
      if (error) {
        setMessage({ type: 'error', text: error.message })
      }
    }

    setLoading(false)
  }

  return (
    <div className="auth-container">
      <div className={`auth-card ${isTransitioning ? 'exiting' : ''}`} key={isForgotPassword ? 'forgot' : isPasswordRecovery ? 'reset' : isSignUp ? 'signup' : 'signin'}>
        <div className="auth-logo">
          <div className="auth-logo-dots">
            <div className="header-dot red" />
            <div className="header-dot green" />
            <div className="header-dot orange" />
          </div>
          <h1 className="auth-logo-title">WORKPONDER</h1>
        </div>

        <div className="auth-header">
          <h2 className="auth-title">
            {isForgotPassword ? 'RESET PASSWORD' : isPasswordRecovery ? 'NEW PASSWORD' : isSignUp ? 'CREATE ACCOUNT' : 'WELCOME BACK'}
          </h2>
          <p className="auth-subtitle">
            {isForgotPassword 
              ? 'Enter your email to receive reset link' 
              : isPasswordRecovery 
              ? 'Enter your new password'
              : isSignUp 
              ? 'Start tracking your daily agendas' 
              : 'Sign in to continue grinding'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isPasswordRecovery && (
            <div className="auth-input-group">
              <label htmlFor="email" className="auth-label">Email</label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="auth-input"
              />
            </div>
          )}

          {!isForgotPassword && !isPasswordRecovery && (
            <div className="auth-input-group">
              <label htmlFor="password" className="auth-label">Password</label>
              <div className="auth-password-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="auth-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-password-toggle"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          )}

          {isPasswordRecovery && (
            <>
              <div className="auth-input-group">
                <label htmlFor="newPassword" className="auth-label">New Password</label>
                <div className="auth-password-wrapper">
                  <input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                    className="auth-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="auth-password-toggle"
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="auth-input-group">
                <label htmlFor="confirmPassword" className="auth-label">Confirm Password</label>
                <div className="auth-password-wrapper">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="auth-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="auth-password-toggle"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </>
          )}

          {message && (
            <div className={`auth-message ${message.type === 'error' ? 'auth-message-error' : 'auth-message-success'}`}>
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`auth-submit-btn ${loading ? 'disabled' : ''}`}
          >
            {loading ? 'LOADING...' : isForgotPassword ? 'SEND RESET LINK' : isPasswordRecovery ? 'UPDATE PASSWORD' : (isSignUp ? 'SIGN UP' : 'SIGN IN')}
          </button>

          {!isForgotPassword && !isPasswordRecovery && !isSignUp && (
            <button
              type="button"
              onClick={() => {
                setIsTransitioning(true)
                setTimeout(() => {
                  setIsForgotPassword(true)
                  setIsSignUp(false)
                  setMessage(null)
                  setIsTransitioning(false)
                }, 400)
              }}
              className="auth-forgot-btn"
            >
              Forgot password?
            </button>
          )}
        </form>

        {!isPasswordRecovery && (
          <div className="auth-toggle">
            {isForgotPassword ? (
              <>
                <span className="auth-toggle-text">Remember your password?</span>
                <button
                  type="button"
                  onClick={() => {
                    setIsTransitioning(true)
                    setTimeout(() => {
                      setIsForgotPassword(false)
                      setMessage(null)
                      setIsTransitioning(false)
                    }, 400)
                  }}
                  className="auth-toggle-btn"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                <span className="auth-toggle-text">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsTransitioning(true)
                    setTimeout(() => {
                      setIsSignUp(!isSignUp)
                      setMessage(null)
                      setIsTransitioning(false)
                    }, 400)
                  }}
                  className="auth-toggle-btn"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
