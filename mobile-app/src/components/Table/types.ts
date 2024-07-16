type actions = 'edit' | 'delete' | 'view' | 'print' | 'download' | 'cancel' | 'confirm';

interface IColumns<T> {
    name: string;
    label: string;
    type: 'string' | 'number' | 'boolean' | 'date' | 'date-hour';
    format?: (value: any, row: T) => string | React.ReactNode;
    head?: 'flex-start' | 'center' | 'flex-end';
    body?: 'flex-start' | 'center' | 'flex-end';
    disableActionCondition?: (value: T, action: actions) => boolean;
    mask?: RegExp;
    disablePast?: boolean;
    disableFuture?: boolean;
}

interface IAction<T> {
    icon: React.ReactNode;
    iconName: string;
    handler: (data: T) => void;
    disabled: (data: T) => boolean;
}

interface ITableProps<T> {
    title?: string;
    data: T[];
    columns: IColumns<T>[];
    loading?: boolean;
    emptyMessage?: string;
    actions?: IAction<T>[];
}

export { ITableProps, IColumns };
