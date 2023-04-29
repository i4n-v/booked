import { Button, Grid, Rating, Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Carousel from "../Carousel";
import { ItemProps } from "./type";

const items = [
  {
    id: 1,
    src: 'https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ',
    title: 'A revolução dos bichos',
    author: 'João Victor',
    rating: 5,
    ratingCount: 349,
    price: 12.99,
  },
  {
    id: 2,
    src: 'https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ',
    title: 'O Hobbit',
    author: 'J. R. R. Tolkien',
    rating: 3,
    ratingCount: 233,
    price: 23.90,
  },
  {
    id: 3,
    src: 'https://i.ytimg.com/vi/_Uu12zY01ts/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCpX6Jan2rxrCAZxJYDXppTP4MoQA',
    title: 'Pequeno príncipe ',
    author: 'Antoine de Saint',
    rating: 2,
    ratingCount: 987,
    price: 36.05,
  },
  {
    id: 4,
    src: 'https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw',
    title: 'Vida estranha',
    author: 'João Victor',
    rating: 5,
    ratingCount: 349,
    price: 12.99,
  },
  {
    id: 5,
    src: 'https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw',
    title: 'Vida estranha',
    author: 'João Victor',
    rating: 5,
    ratingCount: 349,
    price: 12.99,
  },

];

export default function Card() {
  return (
    <Carousel itemsPerPage={4} autoplay={true} autoplayDelay={1000}>
      {items.map((item) => (
        <Item key={item.id} src={item.src} title={item.title} author={item.author} rating={item.rating} ratingCount={item.ratingCount} price={item.price} />
      ))}
    </Carousel>
  );
}

function Item({ src, title, author, rating, ratingCount, price }: ItemProps) {

  return (
    <Grid sx={{
      width: 430, height: 500, marginRight: 2, my: 5, borderRadius: '12px',
      backgroundColor: (t) => t.palette.secondary[50],
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {items ? (
        <img style={{ width: 225, height: 310, paddingTop: 8, paddingBottom: 10 }}
          alt={title} src={src} />
      ) : (
        <Skeleton variant="rectangular" width={219} />
      )}
      {items ? (
        <Grid sx={{ pr: 2 }} >
          <Typography gutterBottom variant="h5">
            {title}
          </Typography>
          <Typography display="block" variant="body1" color="text.secondary">
            Autor: {author}
          </Typography>
          <Typography variant="caption" >
            <Box
              component="fieldset" borderColor="transparent" sx={{ mb: 1, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Rating name="read-only" value={rating} sx={{ color: (t) => t.palette.primary.main, }} />
              <Typography display="block" variant="body1" color="text.secondary">
                ( {ratingCount} )
              </Typography>
              <Button variant="contained" sx={{ marginLeft: 'auto' }}>{`R$ ${price}`}</Button>
            </Box>
          </Typography>
        </Grid>
      ) : (
        <Box sx={{ pt: 0.5 }}>
          <Skeleton />
          <Skeleton width="60%" />
        </Box>
      )}
    </Grid>

  );
}
