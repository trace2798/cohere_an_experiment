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
      <p className="py-2">Type: {type}</p>
      <p className="py-2">Default: {defaultValue} </p>
      <p className="py-2">
        Available options: {options.join(", ")}
      </p>
      <p className="py-2">Functionality: {functionality}</p>
      <p className="py-2">Note: {note}</p>
    </div>
  );
};
