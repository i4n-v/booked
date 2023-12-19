import { RefObject, useState } from "react";
import useDebounce from "../Debounce";

function usePaginateScroll(
  targetRef: RefObject<HTMLDivElement>,
  reverse?: boolean
) {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const target = targetRef.current as HTMLDivElement;
  const debouncePage = useDebounce((newPage) => setPage(newPage), 500);
  const handleScroll = () => {
    if (reverse) {
      if (
        target?.scrollTop - target?.clientHeight <=
        50 - target?.scrollHeight
      ) {
        if (page < maxPage) {
          debouncePage(page + 1);
        }
      }
    } else {
      if (
        target?.scrollTop + target?.clientHeight >=
        target?.scrollHeight - 50
      ) {
        if (page < maxPage) {
          debouncePage(page + 1);
        }
      }
    }
  };

  const paginateTrigger: React.UIEventHandler<HTMLDivElement> | undefined = (
    event
  ) => {
    handleScroll();
  };

  const reset = () => {
    if (target) {
      setPage(1);
      target.scrollTop = 0;
    }
  };

  return {
    page,
    setMaxPage,
    paginateTrigger,
    reset,
    maxPage,
    setPage: debouncePage,
  };
}

export default usePaginateScroll;
