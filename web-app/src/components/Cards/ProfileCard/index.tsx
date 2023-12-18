import { useState } from "react";
import { ProfileCardProps } from "./types";
import { Box, Typography, styled, useTheme, Button } from "@mui/material";
import DefaultImage from "../../../assets/SVG/account.svg";
import { Follow } from "../../../assets/SVG";
import useFollow from "../../../services/useFollow";
import useNotifier from "../../../helpers/Notify";
import { useMutation } from "react-query";

export default function ProfileCard({
  size,
  id,
  name,
  user_name,
  photo_url,
  description,
}: ProfileCardProps) {
  const theme = useTheme();
  const notify = useNotifier();

  const [isFollowing, setIsFollowing] = useState(false);

  const { followUser, unfollowUser } = useFollow();

  const followUserMutation = useMutation(followUser);
  const unfollowUserMutation = useMutation(unfollowUser);
  console.log('id:', id);

  const toggleFollow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    if (!isFollowing) {
      followUserMutation.mutate(id!, {
        onSuccess(response) {
          notify(response.message);
          setIsFollowing(true);
        },
        onError(error: any) {
          notify(error.message, "error");
        },
      });
    } else {
      unfollowUserMutation.mutate(id!, {
        onSuccess(response) {
          notify(response.message);
          setIsFollowing(false);
        },
        onError(error: any) {
          notify(error.message, "error");
        },
      });
    }
  }

  const ProfileImage = styled(Box)({
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    overflow: 'hidden',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  });

  const ProfileContainer = styled(Box)(({ theme }) => ({
    width: "360px",
    height: "138px",
    background: theme.palette.secondary.light,
    boxShadow: theme.shadows[1],
    borderRadius: "8px",
    transition: "0.3s",
    cursor: "pointer",
    position: "relative",
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }));

  const UserInfo = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '4px',
  });

  const UserInfoText = styled(Box)({
    marginLeft: '12px',
    '& span': {
      fontSize: '0.85rem',
    },
  });

  const ButtonWrapper = styled(Box)({
    marginLeft: 'auto',
    height: '60px',
  });

  const DescriptionText = styled(Box)({
    fontSize: '0.85rem',
  });

  return (
    <Box sx={{ position: "relative" }}>
      <ProfileContainer>
        <UserInfo>
          <ProfileImage>
            <img src={photo_url || DefaultImage} alt={name} />
          </ProfileImage>
          <UserInfoText>
            <Typography variant="h6">{name}</Typography>
            <span>@{user_name}</span>
          </UserInfoText>
          <ButtonWrapper>
            <Button
              variant="outlined"
              onClick={toggleFollow}
              sx={{
                height: '30px',
                padding: '6px 12px',
                fontSize: (theme) => theme.typography.fontSize,
                textTransform: 'none',
              }}
            >
              {isFollowing ? 'Seguindo' : 'Seguir'}
              <Follow />
            </Button>
          </ButtonWrapper>
        </UserInfo>
        <DescriptionText>{description}</DescriptionText>
      </ProfileContainer>
    </Box>
  );
}
