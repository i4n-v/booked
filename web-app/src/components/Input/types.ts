export type InputProps = {
    name: string,
    label?: string,
    icon?: Partial<{
        left: React.ReactNode,
        right: React.ReactNode,
    }>
}