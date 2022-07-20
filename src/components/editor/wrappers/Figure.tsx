import cn from "clsx";

import { useState, useEffect, useRef } from "react";
import { NodeViewWrapper, NodeViewProps, NodeViewContent } from "@tiptap/react";

import { X } from "../../../icons";

export const FigureWrapper = ({ node, deleteNode }: NodeViewProps) => {
  const uploaded = useRef(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    let timer: number;

    if (!uploaded.current) {
      setUploading(true);
      timer = setTimeout(() => {
        uploaded.current = true;
        setUploading(false);
      }, 1500);
    }

    return () => clearTimeout(timer);
  }, [uploading]);

  return (
    <NodeViewWrapper as="figure" className="relative" data-type="figure">
      {node.attrs.src && (
        <img
          src={node.attrs.src}
          alt="Image"
          className={cn(uploading && "blur-sm")}
        />
      )}
      <NodeViewContent as="figcaption" className="text-center" dir="auto" />

      <X
        size={"2rem"}
        className="absolute top-2 right-2 cursor-pointer text-rose-500 z-40"
        onClick={() => deleteNode()}
      />
    </NodeViewWrapper>
  );
};
