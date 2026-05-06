import { useEffect, useRef } from 'react'

function DeleteModal({ transaction, onConfirm, onCancel }) {
  const cancelRef = useRef(null);

  useEffect(() => {
    cancelRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onCancel(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onCancel]);

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-icon">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 5h14M8 5V3h4v2M6 5l1 12h6l1-12" />
          </svg>
        </div>
        <h3 className="modal-title" id="modal-title">Delete transaction?</h3>
        <p className="modal-body">
          <span className="modal-target">"{transaction.description}"</span> will be permanently removed. This cannot be undone.
        </p>
        <div className="modal-actions">
          <button ref={cancelRef} className="modal-cancel" onClick={onCancel}>Cancel</button>
          <button className="modal-confirm" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
