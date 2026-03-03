import { useState } from "react";
import {
  GoabIconButton,
  GoabText,
  GoabSkeleton,
  GoabTooltip,
} from "@abgov/react-components";
import {
  GoabxBadge,
  GoabxMenuButton,
  GoabxMenuAction,
} from "@abgov/react-components/experimental";

interface CaseDetailHeaderProps {
  referenceNumber?: string;
  statuses?: Array<{ label: string; type?: string, emphasis?: string }>;
  assignedTo?: string | null;
  onUnassign?: () => void;
  isLoading?: boolean;
}

export function CaseDetailHeader({
  referenceNumber = "",
  statuses = [],
  assignedTo,
  onUnassign,
  isLoading = false,
}: CaseDetailHeaderProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (value: string, fieldName: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 1000);
    });
  };

  return (
    <div className="case-detail-header__tombstone">
      {/* Status Badges */}
      <div className="case-detail-header__badges">
        {isLoading ? (
          <div style={{ display: "flex", gap: "var(--goa-space-s)", alignItems: "center" }}>
            <div style={{ minWidth: "70px" }}>
              <GoabSkeleton type="text" maxWidth="70px" />
            </div>
          </div>
        ) : (
          statuses.map((status, index) => (
            <GoabxBadge
              key={index}
              content={status.label}
              type={status.type as any}
              emphasis={status.emphasis as any}
            />
          ))
        )}
      </div>

      {/* Reference Number Section */}
      {referenceNumber && (
        <div className="case-detail-header__id">
          {isLoading ? (
            <div style={{ minWidth: "140px" }}>
              <GoabSkeleton type="text" maxWidth="140px" />
            </div>
          ) : (
            <>
              <GoabText mb="none" mt="none">
                {referenceNumber}
              </GoabText>
              <GoabTooltip content={copiedField === 'referenceNumber' ? 'Copied' : 'Copy'}>
                <GoabIconButton
                  icon="copy"
                  ariaLabel="Copy reference number"
                  variant="dark"
                  size="small"
                  onClick={() => handleCopy(referenceNumber, 'referenceNumber')}
                />
              </GoabTooltip>
            </>
          )}
        </div>
      )}

      {/* Assigned Worker Menu */}
      {assignedTo && !isLoading && (
        <GoabxMenuButton
          text="Assigned to Me"
          type="tertiary"
          size="compact"
          onAction={(detail) => {
            if (detail.action === "unassign" && onUnassign) {
              onUnassign();
            }
          }}
        >
          <GoabxMenuAction text="Unassign" action="unassign" icon="person-remove" />
        </GoabxMenuButton>
      )}
    </div>
  );
}
