import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import { IListItemProps } from "./types";
import { useState } from "react";
import { CustomList } from "./styles";


export default function ListItems({ data, handleChange = () => null }: IListItemProps) {
    const [selected, setSelected] = useState(0)

    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,) => {
        handleChange(index)
        setSelected(index)
    }
    const theme = useTheme()
    return (
        <CustomList>
            {data?.map((i, index) =>
                <ListItem key={`${i.text}-${index}`} disablePadding>
                    <ListItemButton sx={{
                        textAlign: 'center',
                        color: theme.palette.secondary.light,
                        '&.Mui-selected': {
                            backgroundColor: theme.palette.secondary['900'],
                            color: theme.palette.primary['700'],
                        }
                    }} onClick={(event) => handleListItemClick(event, index)} selected={selected === index}>
                        {i.icon ? <ListItemIcon>
                            {i.icon}
                        </ListItemIcon> : null}
                        <ListItemText primary={i.text} />
                    </ListItemButton>
                </ListItem>
            )}
        </CustomList>
    )
}