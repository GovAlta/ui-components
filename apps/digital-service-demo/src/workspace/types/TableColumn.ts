import { ReactNode } from "react";

export type ColumnType = 'checkbox' | 'badge' | 'text' | 'link' | 'actions';

export interface TableColumn<T> {
    key: string;
    header?: string | ReactNode;
    headerRender?: () => ReactNode;
    type: ColumnType;
    sortable?: boolean;
    render?: (item: T, index: number) => ReactNode;
}
