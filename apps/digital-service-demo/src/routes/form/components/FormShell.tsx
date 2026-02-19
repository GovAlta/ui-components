import { ReactNode } from "react";
import "./FormShell.css";

interface FormShellProps {
  /** Service name shown at the top */
  serviceName?: string;
  /** Optional subtitle or description */
  serviceDescription?: string;
  /** The form content */
  children: ReactNode;
}

/**
 * A clean container for public-facing forms.
 * Provides consistent width, spacing, and optional service branding.
 *
 * Designed for citizen-facing services using the "one idea per page" pattern.
 */
export function FormShell({
  serviceName,
  serviceDescription,
  children
}: FormShellProps) {
  return (
    <div className="form-shell">
      {serviceName && (
        <header className="form-shell__header">
          <h1 className="form-shell__service-name">{serviceName}</h1>
          {serviceDescription && (
            <p className="form-shell__service-description">{serviceDescription}</p>
          )}
        </header>
      )}
      <main className="form-shell__content">
        {children}
      </main>
    </div>
  );
}
