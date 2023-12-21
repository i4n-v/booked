import { ProfileCardProps } from "./types";
import { Box, Typography } from "@mui/material";
import DefaultImage from "../../../assets/SVG/account.svg";
import { Follow, FollowWhite } from "../../../assets/SVG";
import useFollow from "../../../services/useFollow";
import useNotifier from "../../../helpers/Notify";
import { useMutation, useQueryClient } from "react-query";
import {
  ProfileContainer,
  ProfileImage,
  UserInfo,
  UserInfoText,
  DescriptionText,
  FollowButton,
} from "./styles";

export default function ProfileCard({
  id,
  name,
  user_name,
  photo_url,
  description,
  followed,
  onClick,
}: ProfileCardProps) {
  const notify = useNotifier();
  const queryClient = useQueryClient();

  const { followUser, unfollowUser } = useFollow();

  const followMutation = useMutation(followUser);
  const unfollowMutation = useMutation(unfollowUser);

  function togleFollow() {
    if (followed) {
      unfollowMutation.mutate(id, {
        onSuccess(response) {
          notify(response.message, "success");
          queryClient.invalidateQueries("getUsers");
        },
        onError(error: any) {
          notify(error.message, "error");
        },
      });
    } else {
      followMutation.mutate(id, {
        onSuccess(response) {
          notify(response.message, "success");
          queryClient.invalidateQueries("getUsers");
        },
        onError(error: any) {
          notify(error.message, "error");
        },
      });
    }
  }

  return (
    <Box sx={{ position: "relative" }} onClick={onClick}>
      <ProfileContainer>
        <UserInfo>
          <ProfileImage>
            <img src={photo_url || DefaultImage} alt={name} />
          </ProfileImage>
          <UserInfoText>
            <Typography component="span">{name}</Typography>
            <Typography component="span">@{user_name}</Typography>
          </UserInfoText>
          <FollowButton
            variant={followed ? "contained" : "outlined"}
            onClick={(event) => {
              event.stopPropagation();
              togleFollow();
            }}
            endIcon={followed ? <FollowWhite /> : <Follow />}
          >
            {followed ? "Seguindo" : "Seguir"}
          </FollowButton>
        </UserInfo>
        <DescriptionText>{description}</DescriptionText>
      </ProfileContainer>
    </Box>
  );
}
