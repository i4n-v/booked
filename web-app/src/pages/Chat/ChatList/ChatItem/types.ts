export interface ChatItemProps{
    active: boolean;
    username: string;
    last_message?: string;
    unread_messages?: number;
    last_update?: Date;
    onClick: () => void;
}