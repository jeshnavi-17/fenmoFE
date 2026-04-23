/**
 * Dismissible error alert.
 * Props:
 *   message: string
 *   onRetry: () => void (optional)
 */
export default function ErrorBanner({ message, onRetry }) {
  return (
    <div className="alert alert-danger d-flex align-items-center gap-3" role="alert" id="error-banner">
      <i className="bi bi-exclamation-triangle-fill flex-shrink-0 fs-5"></i>
      <div className="flex-grow-1">
        <strong>Something went wrong.</strong> {message}
      </div>
      {onRetry && (
        <button className="btn btn-sm btn-outline-danger" onClick={onRetry} id="retry-btn">
          <i className="bi bi-arrow-clockwise me-1"></i>Retry
        </button>
      )}
    </div>
  )
}
