import React, { useMemo } from "react";
import SkeletonBookCard from "./Templates/SkeletonBookCard";
import { ISkeletonProps, ISkeletonTemplates } from "./types";

const templates: ISkeletonTemplates = {
  "book-card": SkeletonBookCard,
};

export default function Skeleton({ quantity = 1, template, style }: ISkeletonProps) {
  const skeletons = useMemo(() => {
    const generator = Array.from({ length: quantity });
    const SkeletonStructure = templates[template];

    return generator.map((_, index) => (
      <SkeletonStructure key={`${index}-skeleton-structure`} style={style} />
    ));
  }, [quantity, template]);

  return <>{skeletons}</>;
}
