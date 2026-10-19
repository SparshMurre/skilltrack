import React, { useEffect } from 'react';
import SettingsForm from './SettingsForm';

export default function SettingsModal({
  isOpen,
  onClose,
  initialPreferences,
  onSave,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scrolling while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="presentation"
    >
      <div
        className="modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-dialog-title"
      >
        <div className="modal-header">
          <div className="modal-header-text">
            <h2 id="settings-dialog-title" className="modal-title">
              Learning Preferences & Settings
            </h2>
            <p className="modal-subtitle">
              Configure your curriculum goals, weekly study schedule, and topic priorities.
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close settings modal"
          >
            &times;
          </button>
        </div>

        <div className="modal-body">
          <SettingsForm
            initialPreferences={initialPreferences}
            onSave={(updated) => {
              if (onSave) onSave(updated);
            }}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}
