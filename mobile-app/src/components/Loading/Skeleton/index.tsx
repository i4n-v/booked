import React, { useMemo } from "react";
import SkeletonBookCard from "./Templates/SkeletonBookCard";
import { ISkeletonProps, ISkeletonTemplates } from "./types";
import SkeletonMessage from "./Templates/SkeletonMessage";
import SkeletonChat from "./Templates/SkeletonChat";
import SkeletonUserCard from "./Templates/SkeletonUserCard";

const templates: ISkeletonTemplates = {
  "book-card": SkeletonBookCard,
  "message": SkeletonMessage,
  "chat": SkeletonChat,
  "user-card": SkeletonUserCard,
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
