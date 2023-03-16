import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import { Button, Rating } from '@mui/material';

const data = [
    {
        src: 'https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ',
        title: 'O Hobbit',
        author: 'J. R. R. Tolkien',
        rating: 3,
        price: 23.90,
    },
    {
        src: 'https://i.ytimg.com/vi/_Uu12zY01ts/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCpX6Jan2rxrCAZxJYDXppTP4MoQA',
        title: 'Pequeno príncipe ',
        author: 'Antoine de Saint',
        rating: 2,
        price: 36.05,
    },
    {
        src: 'https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw',
        title: 'Vida estranha',
        author: 'João Victor',
        rating: 5,
        price: 12.99,
    },
    {
        src: 'https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ',
        title: 'A revolução dos bichos',
        author: 'João Victor',
        rating: 5,
        price: 12.99,
    },

];

interface MediaProps {
    loading?: boolean;
}

export default function Card(props: MediaProps) {
    const { loading = false } = props;

    return (
        <Grid container wrap="nowrap" justifyContent="center">
            {(loading ? Array.from(new Array(3)) : data).map((item, index) => (
                <Box key={index} sx={{ width: 430, height: 500, marginRight: 2, my: 5, bgcolor: '#FFFFFF', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                    {item ? (
                        <img
                            style={{ width: 225, height: 310, paddingTop: 8, paddingBottom: 10 }}
                            alt={item.title}
                            src={item.src}

                        />
                    ) : (
                        <Skeleton variant="rectangular" width={219} />
                    )}
                    {item ? (
                        <Box sx={{ pr: 2 }} >
                            <Typography gutterBottom variant="h5">
                                {item.title}
                            </Typography>
                            <Typography display="block" variant="body1" color="text.secondary">
                                Autor: {item.author}
                            </Typography>
                            <Typography variant="caption" >
                                <Box
                                    component="fieldset" mb={1} borderColor="transparent" sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Rating name="read-only" value={item.rating} style={{ color: '#9b51e0', borderColor: '#9b51e0' }} />
                                    <Button variant="contained">{`R$ ${item.price}`}</Button>
                                </Box>
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ pt: 0.5 }}>
                            <Skeleton />
                            <Skeleton width="60%" />
                        </Box>
                    )}
                </Box>
            ))}

            <div>


            </div>
        </Grid>

    );
}

