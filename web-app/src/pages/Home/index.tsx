import { Button } from "@mui/material";
import useNotifier from "../../helpers/Notify";

export default function Home() {
    const notify = useNotifier()
    return <>
        <Button variant="text" color="secondary" onClick={() => notify('Informo que...', 'info')}>Text</Button>
        <Button variant="contained" color="secondary" onClick={() => notify('Notificado', 'success')}>Contained</Button>
        <Button variant="outlined" onClick={() => notify('errado', 'error')}>Outlined</Button>
    </>
}