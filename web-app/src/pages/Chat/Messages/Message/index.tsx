import { AccountCircle } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import MoreOptions from "../../../../components/MoreOptions";
import { MessageProps } from "./types";
import MessageImagePreview from "../Image/Preview";
import { BookCard } from "../../../../components/Cards";
import { useNavigate } from "react-router-dom";
import ProfilePhoto from "../../ProfilePhoto";

export default function Message({
  showAccount,
  response,
  content,
  id,
  actionsOptions,
  username,
  profile_photo,
  photo,
  books,
}: MessageProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  return (
    <Box
      onMouseOver={() => setShowOptions(true)}
      onMouseOut={() => setShowOptions(false)}
      onMouseLeave={() => setShowOptions(false)}
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: response ? "initial" : "row-reverse",
        columnGap: "12px",
      }}
    >
      <Box sx={{ display: showAccount && response ? "block" : "none" }}>
        {!profile_photo ? (
          <AccountCircle color="primary" fontSize="large" />
        ) : (
          <ProfilePhoto src={profile_photo} size={"2.1875rem"} />
        )}
      </Box>
      <Paper
        sx={{
          backgroundColor: response ? "initial" : (t) => t.palette.primary[400],
          padding: "8px 12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "6px",
          wordBreak: "break-word",
          maxWidth: "550px",
          marginLeft: showAccount || !response ? "initial" : "47px",
        }}
      >
        {showAccount && response && (
          <Box id={"username"} width={"100%"} padding={"5px 0px"}>
            <Typography component={"span"} color={"primary"}>
              {username}
            </Typography>
          </Box>
        )}
        <Box width={"100%"}>
          {books?.length ? (
            <Box display={"grid"} gridAutoColumns={"1fr"} rowGap={3}>
              {books.map((book, index) => (
                <BookCard
                  size="md"
                  title={book.name}
                  author={book.user.name}
                  rating={book.rating}
                  bookId={book.id}
                  showWishe={false}
                  ratingQuantity={book.total_users_rating}
                  price={book.price}
                  image={book.photo_url}
                  key={index}
                  onClick={() => navigate(`/explore/${book.id}`)}
                />
              ))}
            </Box>
          ) : photo ? (
            <MessageImagePreview photoURL={photo} />
          ) : (
            content
          )}
        </Box>
      </Paper>
      {!response && (
        <Box
          display={showOptions ? "flex" : "none"}
          position={"relative"}
          alignItems={"center"}
          sx={{ cursor: "pointer" }}
        >
          <MoreOptions
            options={actionsOptions}
            open={dropdown}
            handleOpen={setDropdown}
            id={id as string}
          />
        </Box>
      )}
    </Box>
  );
}
