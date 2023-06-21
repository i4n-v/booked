import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "react-query";
import { ToOpenForm } from "../types";

export type CommentsFormPros = {
    openForm?: ToOpenForm; 
    handleClose: React.Dispatch<React.SetStateAction<ToOpenForm | undefined>>;
}