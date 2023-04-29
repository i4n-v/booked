import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import { CarouselProps } from './types';

const Container = styled('div')<{ minHeight: string }>(
  ({ theme, minHeight }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2rem',
    height: 'auto',
    minHeight,
    '& > *': {
      marginBottom: '1rem',
    },
  })
);

const Item = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: 'auto',
  [theme.breakpoints.up('sm')]: {
    width: '50%',
  },
  [theme.breakpoints.up('md')]: {
    width: '33.33%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '25%',
  },
}));

const PaginationWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '1rem',
});

const PageButton = styled(Button)(({ theme }) => ({
  minWidth: 0,
  padding: 0,
  margin: 0,
  [theme.breakpoints.down('sm')]: {
    margin: '0 0.2rem',
  },
}));


const Carousel = ({
  itemsPerPage = 4,
  autoplay = false,
  autoplayDelay = 3000,
  minHeight = '0',
  rollPerPage = 1,
  children,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numPages, setNumPages] = useState(1);

  useEffect(() => {
    setNumPages(Math.ceil(children.length / itemsPerPage));
  }, [children.length, itemsPerPage]);

  useEffect(() => {
    let interval: any;
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentIndex(
          (currentIndex + itemsPerPage) % children.length
        );
      }, autoplayDelay);
    }
    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, currentIndex, itemsPerPage, children.length]);

  const handlePrevClick = () => {
    setCurrentIndex(
      (currentIndex - rollPerPage * itemsPerPage + children.length) % children.length
    );
  };

  const handleNextClick = () => {
    setCurrentIndex(
      (currentIndex + rollPerPage * itemsPerPage) % children.length
    );
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentIndex((value - 1) * itemsPerPage);
  };

  const renderItems = () => {
    const items = [];
    for (
      let i = currentIndex;
      i < currentIndex + itemsPerPage && i < children.length;
      i++
    ) {
      items.push(
        <Item key={i}>
          {children[i]}
        </Item>
      );
    }
    return items;
  };

  return (
    <Container minHeight={minHeight}>
      <Grid container spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {renderItems()}
      </Grid>
      {numPages > 1 && (
        <PaginationWrapper>
          <Pagination
            count={numPages}
            page={Math.floor(currentIndex / itemsPerPage) + 1}
            onChange={handlePageChange}
          />
        </PaginationWrapper>
      )}

    </Container>
  );
};

export default Carousel;