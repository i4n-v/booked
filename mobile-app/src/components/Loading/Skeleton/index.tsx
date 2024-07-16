import React, { useMemo } from "react";
import { SkeletonFlexibleCard } from "./Templates/SkeletonFlexibleCard";
import { ISkeletonProps, ISkeletonTemplates } from "./types";

const templates: ISkeletonTemplates = {
  "flex-card": SkeletonFlexibleCard,
};

export default function Skeleton({ quantity = 1, template = "flex-card", style }: ISkeletonProps) {
  const skeletons = useMemo(() => {
    const generator = Array.from({ length: quantity });
    const SkeletonStructure = templates[template];

    return generator.map((_, index) => (
      <SkeletonStructure key={`${index}-skeleton-structure`} style={style} />
    ));
  }, [quantity, template]);

  return <>{skeletons}</>;
}
