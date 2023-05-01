export type CarouselProps = {
    itemsPerPage?: number;
    autoplay?: boolean;
    autoplayDelay?: number;
    minHeight?: string;
    rollPerPage?: number;
    children: React.ReactNode[];
};