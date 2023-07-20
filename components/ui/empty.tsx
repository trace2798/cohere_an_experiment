import Image from "next/image";


interface EmptyProps {
  label: string;
}

export const Empty = ({
  label
}: EmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-20">
      <div className="relative h-72 w-72">
        <Image src="/images/empty.svg" fill alt="Empty" />
      </div>
      <p className="text-sm text-center text-muted-foreground">
        {label}
      </p>
    </div>
  );
};