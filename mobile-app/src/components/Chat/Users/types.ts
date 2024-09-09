import IUser from "@/types/User";

export interface ContainerProps {active?: boolean}

export interface UserItemProps extends ContainerProps, IUser {
    customOnPress?: () => void
}