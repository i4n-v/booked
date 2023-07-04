import { useContext, useState } from "react"
import { CommentsContainerProps, CommentsPros, IComment, ToOpenForm } from "./types"
import { DropdownOptions } from "../../../../components/Dropdown/type"
import { Box, Button, Divider, Typography } from "@mui/material"
import MoreOptions from "../../../../components/MoreOptions"
import { CommentBox, CommentsContainer, CommentsContainerHeader, CommentsList } from "./styles"
import { Account } from "../../../../assets/SVG"
import useComment from "../../../../services/useComment"
import { useMutation, useQuery } from "react-query"
import Page from "../../../../components/Dialog"
import CommentsForm from "./Form"
import { AuthContext } from "../../../../contexts/AuthContext"
import useNotifier from "../../../../helpers/Notify"
import { useConfirm } from "../../../../helpers/Confirm"
import Message from "../../../../helpers/messages"

const Comment = ({ openAnswer = () => null, refetchFn, answer, loggedUser, ...comment }: CommentsPros) => {
    const [openOptions, setOpenOptions] = useState(false)
    const [seeAnswers, setSeeAnswers] = useState(false)
    const [authData] = useContext(AuthContext)
    const { getComments, deleteComment } = useComment()
    const deleteMutation = useMutation(deleteComment)
    const notify = useNotifier()
    const confirm = useConfirm()
    const { data: responses, refetch } = useQuery([`${comment.id}-answer`, [seeAnswers, comment.id]], () => getComments({ comment_id: comment.id }), {
        retry: false,
        enabled: seeAnswers,
        suspense: false,
    })

    const isFromLoggedUser = loggedUser?.id === comment.user?.id

    const onDelete = () => {
        deleteMutation.mutate(comment.id as string, {
            onSuccess(data) {
                notify(data.message)
                if (refetchFn instanceof Function) refetchFn()
            },
            onError(error: any) {
                notify(error.message, 'error')
            },
        })
    }

    const canAnswer = !answer ?
        [
            {
                label: "Responder",
                handler: () => openAnswer({ commentId: comment.id, description: "", refetchFn: refetch, title: `Resposta: ${comment.user?.name}` })
            }
        ] : []
    const userOptions: DropdownOptions[] = [
        {
            label: "Editar",
            handler: () => openAnswer({ commentId: comment.id, description: comment.description, refetchFn })
        }, {
            label: "Excluir",
            handler() {
                confirm(Message.DELETE_QUESTION("*Comentário*"), onDelete)
            },
        }
    ]

    const commentOptions: DropdownOptions[] = isFromLoggedUser ? [...canAnswer, ...userOptions] : [...canAnswer]

    return (
        <Box position={"relative"}>
            {authData?.valid && commentOptions.length ? <MoreOptions open={openOptions} handleOpen={setOpenOptions} id={`${comment.id}`} options={commentOptions} /> : null}
            <CommentBox response={answer}>
                <Box display={"flex"} alignItems={"center"} columnGap={"8px"}>
                    <Account />
                    <span>{comment.user?.name}</span>
                </Box>
                <Box width={"80%"}>
                    <Typography sx={{
                        font: t => t.font.xs,
                        color: t => t.palette.secondary[800]
                    }}>
                        {comment.description}
                    </Typography>
                </Box>
            </CommentBox>
            {!answer ? <Typography
                component={"a"}
                onClick={() => setSeeAnswers(true)}
                sx={{
                    font: t => t.font.xs,
                    color: t => t.palette.secondary[800],
                    marginLeft: "20px",
                    cursor: "pointer"
                }}>
                {`Visualizar respostas ( ${responses?.totalItems || comment.total_responses} )`}
            </Typography> : null}
            {!answer && seeAnswers ? <CommentsList>
                {responses?.items?.map((comment) => (
                    <Comment answer refetchFn={refetch} loggedUser={loggedUser} openAnswer={openAnswer} key={comment.id} {...comment} />
                ))}
            </CommentsList> : null}
        </Box>
    )
}

export default function Comments({ bookId, bookName }: CommentsContainerProps) {
    const [openForm, setOpenForm] = useState<ToOpenForm>()
    const [authData] = useContext(AuthContext)

    const { getComments } = useComment();
    const { data: comments, refetch } = useQuery(['getBookComments'], () => getComments({ book_id: bookId }))

    return (
        <CommentsContainer>
            <Page open={!!openForm} onClose={() => setOpenForm(undefined)} title={openForm?.title} maxWidth="md" minWidth={"960px"}>
                <CommentsForm openForm={openForm} handleClose={setOpenForm} />
            </Page>
            <Box>
                <CommentsContainerHeader>
                    <span>Comentários</span>
                    {authData?.valid ?
                        <Button onClick={() => setOpenForm({ bookId, refetchFn: refetch, title: bookName })} variant="contained">COMENTAR</Button>
                        : null
                    }
                </CommentsContainerHeader>
                <Divider />
            </Box>
            <CommentsList>
                {comments?.items?.map((comment: IComment) =>
                    <Comment
                        {...comment}
                        openAnswer={setOpenForm}
                        loggedUser={authData?.userData}
                        key={comment.id}
                        refetchFn={refetch}
                    />)}
                <Box></Box>
            </CommentsList>
        </CommentsContainer>
    )
}