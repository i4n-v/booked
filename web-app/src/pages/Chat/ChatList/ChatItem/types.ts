export interface ChatItemProps{
    active: boolean;
    username: string;
    last_message?: string;
    unread_messages?: number;
    onClick: () => void;
}