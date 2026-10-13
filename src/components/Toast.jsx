import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast(props) {
  const toasts = props.toasts || [];
  const onDismiss = props.onDismiss;
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map((toast) => {
        let icon = <Info size={18} color="var(--gold-accent)" />;
        let typeClass = 'toast-info';

        if (toast.type === 'success') {
          icon = <CheckCircle2 size={18} color="var(--success)" />;
          typeClass = 'toast-success';
        } else if (toast.type === 'error') {
          icon = <AlertCircle size={18} color="var(--danger)" />;
          typeClass = 'toast-error';
        }

        return (
          <div key={toast.id} className={`toast ${typeClass}`}>
            <div style={{ flexShrink: 0 }}>{icon}</div>
            <div style={{ flexGrow: 1, fontSize: '0.875rem' }}>{toast.message}</div>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              style={{ color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
