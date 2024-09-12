interface IPDFViewerProps {
  url?: string;
  initialPage?: number;
  maxPages?: number;
  markedPage?: number;
  showMarkPage?: boolean;
  onMarkPage?(page: number): void;
  onLoad?(): void;
}

export { IPDFViewerProps };
