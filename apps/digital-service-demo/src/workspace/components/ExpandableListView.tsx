import React, { useState, ReactNode } from "react";
import { GoabIcon, GoabSkeleton, GoabDataGrid } from "@abgov/react-components";

interface ExpandableListViewProps<T> {
    data: T[];
    isLoading?: boolean;
    renderCollapsed: (item: T) => {
        title: ReactNode;
        badge?: ReactNode;
        secondaryInfo?: ReactNode;
        actions?: ReactNode;
    };
    renderExpanded: (item: T) => ReactNode;
    getRowKey: (item: T) => string;
}

export function ExpandableListView<T>({
    data,
    isLoading,
    renderCollapsed,
    renderExpanded,
    getRowKey,
}: ExpandableListViewProps<T>) {
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

    const toggleExpand = (id: string) => {
        setExpandedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleExpand(id);
        }
    };

    const handleHeaderClick = (e: React.MouseEvent, id: string) => {
        // Don't trigger if clicking on interactive elements
        const target = e.target as HTMLElement;
        if (
            target.closest('a') ||
            target.closest('goa-link') ||
            target.closest('button:not(.expandable-list__toggle)') ||
            target.closest('goa-button')
        ) {
            return;
        }
        toggleExpand(id);
    };

    if (isLoading) {
        return (
            <div className="expandable-list">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="expandable-list__item">
                        <div className="expandable-list__header">
                            <div className="expandable-list__toggle">
                                <GoabSkeleton type="text" maxWidth="20px" />
                            </div>
                            <GoabSkeleton type="title" maxWidth="200px" />
                            <GoabSkeleton type="text" maxWidth="80px" />
                            <div className="expandable-list__secondary">
                                <GoabSkeleton type="text" maxWidth="60px" />
                            </div>
                            <div className="expandable-list__actions">
                                <GoabSkeleton type="text" maxWidth="40px" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (data.length === 0) {
        return null;
    }

    return (
        <GoabDataGrid keyboardNav="layout" keyboardIconPosition="right">
            <div className="expandable-list">
                {data.map(item => {
                    const key = getRowKey(item);
                    const isExpanded = expandedIds.has(key);
                    const { title, badge, secondaryInfo, actions } = renderCollapsed(item);

                    return (
                        <div key={key} className={`expandable-list__item ${isExpanded ? 'expandable-list__item--expanded' : ''}`} data-grid="row">
                            <div
                                className="expandable-list__header"
                                onClick={(e) => handleHeaderClick(e, key)}
                            >
                                <button
                                    className="expandable-list__toggle"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleExpand(key);
                                    }}
                                    onKeyDown={(e) => handleKeyDown(e, key)}
                                    aria-expanded={isExpanded}
                                    aria-label={isExpanded ? "Collapse row" : "Expand row"}
                                    data-grid="cell-1"
                                >
                                    <GoabIcon
                                        type={isExpanded ? "chevron-down" : "chevron-forward"}
                                        size="medium"
                                    />
                                </button>
                                <div className="expandable-list__heading-group">
                                    <span className="expandable-list__title" data-grid="cell-2">{title}</span>
                                    <span data-grid="cell-3">{badge}</span>
                                </div>
                                <div className="expandable-list__right-group">
                                    <div className="expandable-list__secondary" data-grid="cell-4">{secondaryInfo}</div>
                                    <div className="expandable-list__actions" data-grid="cell-5">{actions}</div>
                                </div>
                            </div>
                            {isExpanded && (
                                <div className="expandable-list__content">
                                    {renderExpanded(item)}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </GoabDataGrid>
    );
}
