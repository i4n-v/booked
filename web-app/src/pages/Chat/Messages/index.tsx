import { FormProvider, useForm } from "react-hook-form";
import { ChatMessages, ChatMessagesContainer, NewMessage } from "./styles";
import Input from "../../../components/Input";
import { Button } from "@mui/material";
import { Send } from "@mui/icons-material";
import Message from "./Message";
import useMessage from "../../../services/useMessage";
import { useMutation, useQuery } from "react-query";
import useChat from "../../../services/useChat";
import { IChat } from "../../../services/useChat/types";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { IMessage } from "../../../services/useMessage/types";

export default function Messages({chat}: {chat: IChat}){
    const form = useForm({
        defaultValues:{
            message: ""
        },
    })

    const [messagesToShow,setMessagesToShow] = useState<IMessage[]>()

    const [authData] = useContext(AuthContext)

    const {createMessage} = useMessage()
    const {getMessages} = useChat()

    const chatMessages = useQuery([], () => getMessages(chat.id as string,{}),{
      onSuccess: (data) => {
        setMessagesToShow(data.items.reverse())
      }
    })
    const sendMutation = useMutation({
        mutationFn: createMessage,
        mutationKey: "sendMessage"
    })

    const sendMessage = form.handleSubmit(({message}: {message: string}) => {
        if(!message) return
        sendMutation.mutate({
            chat_id: chat.id as string,
            content: message,
            receiver_id:( chat.first_user.id !== authData?.userData?.id ? chat.first_user.id : chat.second_user.id) as string,
            sender_id: authData?.userData?.id as string
        },{
            onSuccess: (data) => {
            form.reset()
             setMessagesToShow(curr => [...curr as IMessage[]])
            }
        })
    })
    
    return (
        <ChatMessagesContainer>
          <NewMessage>
            <FormProvider {...form}>
              <form onSubmit={sendMessage}>
                <Input
                  type="text"
                  name="message"
                  inputProps={{ maxLength: 255 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ fontSize: "32px" }}
                >
                  <Send />
                </Button>
              </form>
            </FormProvider>
          </NewMessage>
          <ChatMessages>
            {/* <Box sx={{textAlign: "center",font: t => t.font.xs}}>
              Someone is typing...
            </Box> */}
            {messagesToShow?.map((message,index,array) => {
                const itsMine = message.sender.id === authData?.userData?.id
                const showProfile =  array[index + 1]?.receiver.id !== message.receiver.id
                return <Message content={message.content} showAccount={showProfile} response={!itsMine} />
            })}
            
          </ChatMessages>
        </ChatMessagesContainer>
    )
}