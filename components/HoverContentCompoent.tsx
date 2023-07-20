import React from "react";

interface HoverContentComponentProps {
  type: string;
  defaultValue: string;
  options: string[];
  functionality: string;
  note: string;
}

export const HoverContentComponent: React.FC<HoverContentComponentProps> = ({
  type,
  defaultValue,
  options,
  functionality,
  note,
}) => {
  return (
    <div className="text-left">
      <p className="py-2">
        Type: <span className="text-neutral-400">{type}</span>
      </p>
      <p className="py-2">Default:<span className="text-neutral-400"> {defaultValue}</span> </p>
      <p className="py-2">Available options:<span className="text-neutral-400"> {options.join(", ")}</span> </p>
      <p className="py-2">Functionality:<span className="text-neutral-400"> {functionality}</span></p>
      <p className="py-2">Note:<span className="text-neutral-400"> {note}</span></p>
    </div>
  );
};
