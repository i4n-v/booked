import { useQueryClient } from "react-query"
import { BookBackground } from "../assets/SVG"

export default function IsLoading({ children, status }: any) {
    const queryClient = useQueryClient()

    if (queryClient.isFetching() || status) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <BookBackground />
        </div>
    }
    return <>{children}</>
}