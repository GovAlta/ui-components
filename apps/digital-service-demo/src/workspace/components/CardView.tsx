import React, { ReactNode } from "react";
import { GoabContainer, GoabSkeleton, GoabDataGrid, GoabBlock } from "@abgov/react-components";

interface CardSection {
    heading: string;
    fields: Array<{
        label: string;
        value: ReactNode;
    }>;
}

interface CardViewProps<T> {
    data: T[];
    isLoading?: boolean;
    renderCard: (item: T) => {
        title: ReactNode;
        badge?: ReactNode;
        actions?: ReactNode;
        sections: CardSection[];
    };
    getRowKey: (item: T) => string;
}

export function CardView<T>({
    data,
    isLoading,
    renderCard,
    getRowKey,
}: CardViewProps<T>) {

    if (isLoading) {
        return (
            <div className="cases-card-grid">
                {[...Array(5)].map((_, i) => (
                    <div key={i} data-grid="row">
                        <GoabContainer
                            accent="thick"
                            type="non-interactive"
                            padding="compact"
                            mb="none"
                            heading={
                                <div className="case-card__title">
                                    <GoabSkeleton type="title" maxWidth="200px" />
                                    <GoabSkeleton type="text" maxWidth="80px" />
                                </div>
                            }
                            actions={
                                <GoabSkeleton type="text" maxWidth="40px" />
                            }
                        >
                            <div className="case-card__body">
                                <div className="case-card__sections">
                                    <div className="case-card__section">
                                        <GoabSkeleton type="text-small" maxWidth="80px" />
                                        <div className="case-card__section-fields" style={{ marginTop: 'var(--goa-space-s)' }}>
                                            <GoabBlock direction="column" gap="2xs">
                                                <GoabSkeleton type="text-small" maxWidth="60px" />
                                                <GoabSkeleton type="text" maxWidth="100px" />
                                            </GoabBlock>
                                            <GoabBlock direction="column" gap="2xs">
                                                <GoabSkeleton type="text-small" maxWidth="50px" />
                                                <GoabSkeleton type="text" maxWidth="80px" />
                                            </GoabBlock>
                                        </div>
                                    </div>
                                    <div className="case-card__section">
                                        <GoabSkeleton type="text-small" maxWidth="80px" />
                                        <div className="case-card__section-fields" style={{ marginTop: 'var(--goa-space-s)' }}>
                                            <GoabBlock direction="column" gap="2xs">
                                                <GoabSkeleton type="text-small" maxWidth="65px" />
                                                <GoabSkeleton type="text" maxWidth="110px" />
                                            </GoabBlock>
                                            <GoabBlock direction="column" gap="2xs">
                                                <GoabSkeleton type="text-small" maxWidth="45px" />
                                                <GoabSkeleton type="text" maxWidth="70px" />
                                            </GoabBlock>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </GoabContainer>
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
            <div className="cases-card-grid">
                {data.map(item => {
                    const key = getRowKey(item);
                    const { title, badge, actions, sections } = renderCard(item);

                    return (
                        <GoabContainer
                            key={key}
                            accent="thick"
                            type="non-interactive"
                            padding="compact"
                            mb="none"
                            data-grid="row"
                            heading={
                                <div className="case-card__title">
                                    <span data-grid="cell-1">{title}</span>
                                    <span data-grid="cell-2">{badge}</span>
                                </div>
                            }
                            actions={
                                <div data-grid="cell-3" className="case-card__actions">
                                    {actions}
                                </div>
                            }
                        >
                            <div className="case-card__body">
                                <div className="case-card__sections">
                                    {sections.map((section, sectionIndex) => (
                                        <div key={section.heading} className="case-card__section">
                                            <div className="case-card__section-heading">{section.heading}</div>
                                            <div className="case-card__section-fields">
                                                {section.fields.map((field, fieldIndex) => (
                                                    <GoabBlock
                                                        key={field.label}
                                                        direction="column"
                                                        gap="xs"
                                                        data-grid={`cell-${4 + sectionIndex * 3 + fieldIndex}`}
                                                    >
                                                        <span className="case-card__label">{field.label}</span>
                                                        <span className="case-card__value">{field.value}</span>
                                                    </GoabBlock>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </GoabContainer>
                    );
                })}
            </div>
        </GoabDataGrid>
    );
}
