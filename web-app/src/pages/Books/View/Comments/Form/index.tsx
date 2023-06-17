import { FormProvider, useForm } from "react-hook-form";
import Input from "../../../../../components/Input";
import { Button } from "@mui/material";
import useComment from "../../../../../services/useComment";
import { useMutation } from "react-query";
import { CommentsFormPros } from "./types";
import useNotifier from "../../../../../helpers/Notify";

export default function CommentsForm({ openForm, handleClose }: CommentsFormPros) {
    const form = useForm({
        defaultValues: {
            text: openForm?.description || "" 
        }
    })
    const { createComment,updateComment } = useComment();
    const createMutation = useMutation(createComment)
    const updateMutation = useMutation(updateComment)
    const notify = useNotifier()

    const handleSubmit = form.handleSubmit((values) => {
        if (!!openForm?.description) {
            updateMutation.mutate({ comment_id: openForm.commentId, description: values.text }, {
                onSuccess(data) {
                    if(openForm?.refetchFn instanceof Function) {
                        openForm?.refetchFn()
                    } 
                    handleClose(undefined)
                    notify(data.message)
                },
                onError(error: any) {
                    notify(error.message,'error')
                }
            })
            return
        }
        createMutation.mutate({ book_id: openForm?.bookId, comment_id: openForm?.commentId, description: values.text }, {
            onSuccess(data) {
                if(openForm?.refetchFn instanceof Function) {
                    openForm?.refetchFn()
                } 
                handleClose(undefined)
                notify(data.message)
            },
            onError(error: any) {
                notify(error.message,'error')
            }
        })
    })
    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
                <Input shrink multiline maxRows={6} minRows={6} name="text" label="Comentário" />
                <Button sx={{ width: "134px", height: "42px" }} variant="contained" type="submit">COMENTAR</Button>
            </form>
        </FormProvider>
    )
}