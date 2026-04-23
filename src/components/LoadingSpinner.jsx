/**
 * Loading spinner (Bootstrap).
 * Props:
 *   message: string (optional)
 */
export default function LoadingSpinner({ message = 'Loading expenses…' }) {
  return (
    <div className="spinner-wrapper" role="status" aria-live="polite">
      <div className="text-center">
        <div className="spinner-border text-primary mb-2" style={{ width: '2.5rem', height: '2.5rem' }}></div>
        <p className="text-muted small mb-0">{message}</p>
      </div>
    </div>
  )
}
