import { Account } from "@/components/Icons";
import {
  CardContainer,
  CardWrapper,
  Comment,
  CommentContainer,
  Divider,
  MoreResponses,
  MoreResponsesContainer,
  ResponsesContainer,
  UserName,
  UserPhoto,
} from "./styles";
import { ICommentCardProps } from "./types";
import { useQuery } from "react-query";
import { useComment } from "@/services";
import { useContext, useState } from "react";
import { IComment } from "@/types/Comment";
import { Skeleton } from "@/components/Loading";
import { TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";
import Swipeable from "@/components/Swipeable";
import { AuthContext } from "@/contexts/AuthContext";

export default function CommentCard({
  data,
  isResponse,
  onResponse,
  onDelete,
  onEdit,
}: ICommentCardProps<IComment>) {
  const theme = useTheme();
  const { user } = useContext(AuthContext)!;
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [responses, setResponses] = useState<IComment[]>([]);

  const { getComments } = useComment();

  const responsesQuery = useQuery(
    ["comments", data.id],
    () => getComments({ comment_id: data.id, page: 1, limit: 5 }),
    {
      enabled: data.total_responses <= 5 && !isResponse,
      onSuccess(response) {
        if (page === 1) {
          setTotalPages(response.totalPages);
        }

        setResponses((comments) =>
          page === 1 ? response.items : [...comments, ...response.items],
        );
      },
    },
  );

  function handleShowMore() {
    if (page <= totalPages) {
      setPage((page) => page + 1);
      responsesQuery.refetch();
    }
  }

  return (
    <CardWrapper>
      <Swipeable
        data={data}
        itemKeyExtractor="id"
        confirmMessage="Você realmente deseja *action* este comentário?"
        hiddeActions={(data, action) => {
          if (["edit", "delete"].includes(action)) {
            return data.user.id !== user?.id;
          }

          if (action === "response" && isResponse) {
            return true;
          }

          return false;
        }}
        actions={[
          {
            name: "response",
            onPress: onResponse,
          },
          {
            name: "edit",
            onPress: onEdit,
          },
          {
            name: "delete",
            confirm: true,
            onPress: onDelete,
          },
        ]}
      >
        <CardContainer>
          {data.user.photo_url ? <UserPhoto source={{ uri: data.user.photo_url }} /> : <Account />}
          <CommentContainer>
            <UserName>{data.user.name}</UserName>
            <Comment>{data.description}</Comment>
          </CommentContainer>
        </CardContainer>
      </Swipeable>
      {!!responses.length && (
        <ResponsesContainer>
          {responses.map((response) => (
            <CommentCard
              key={response.id}
              isResponse
              data={response}
              onResponse={onResponse}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
          {responsesQuery.isFetching && <Skeleton template="comment-card" quantity={5} />}
        </ResponsesContainer>
      )}
      {(page < totalPages || (!responses.length && !!data.total_responses)) && !isResponse && (
        <MoreResponsesContainer>
          <Divider />
          <TouchableOpacity activeOpacity={theme.shape.opacity} onPress={handleShowMore}>
            <MoreResponses>Respostas ({data.total_responses - responses.length})</MoreResponses>
          </TouchableOpacity>
          <Divider />
        </MoreResponsesContainer>
      )}
    </CardWrapper>
  );
}
