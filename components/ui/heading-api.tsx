interface HeadingApiProps {
  title: string;
  description: string;
  method?: string;
  link?: string;
}

export const HeadingApi = ({
  title,
  description,
  method,
  link,
}: HeadingApiProps) => {
  return (
    <>
      <div className="flex px-4 mb-8 text-left lg:px-8 gap-x-3">
        <div>
          <h2 className="text-3xl font-bold text-primary">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
          <p className="text-sm text-muted-foreground">
            {" "}
            <span className="px-1 py-[1px] text-sm text-indigo-600 border rounded-lg text-muted-foreground border-slate-600">
              {method}
            </span>
            &nbsp;{link}
          </p>
        </div>
      </div>
    </>
  );
};
