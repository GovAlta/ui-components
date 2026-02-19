import React from "react";
import { GoabButton } from "@abgov/react-components";
import emptyStateIllustration from "../../assets/empty-state-illustration.svg";

interface EmptyStateProps {
    /** Main heading text */
    heading?: string;
    /** Secondary text below the heading */
    subline?: string;
    /** Button text (if not provided, no button is shown) */
    buttonText?: string;
    /** Click handler for the button */
    onButtonClick?: () => void;
    /** Custom illustration URL (defaults to standard empty state illustration) */
    illustration?: string;
}

/**
 * EmptyState - Displayed when a list/table has no results to show.
 *
 * Usage:
 *   <EmptyState
 *     heading="No results found"
 *     subline="Try adjusting your search or filters."
 *     buttonText="Clear filters"
 *     onButtonClick={handleClearFilters}
 *   />
 */
export function EmptyState({
    heading = "No results found",
    subline = "Try adjusting your search or filters.",
    buttonText = "Clear filters",
    onButtonClick,
    illustration = emptyStateIllustration,
}: EmptyStateProps) {
    return (
        <div className="cases-empty-state">
            <img
                src={illustration}
                alt=""
                className="cases-empty-state__illustration"
            />
            <span className="cases-empty-state__heading">{heading}</span>
            <span className="cases-empty-state__subline">{subline}</span>
            {buttonText && onButtonClick && (
                <GoabButton type="tertiary" size="compact" onClick={onButtonClick}>
                    {buttonText}
                </GoabButton>
            )}
        </div>
    );
}
