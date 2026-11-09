import { cn } from "@/lib/utils";

type TableProps = {} & React.ComponentProps<"table">;
function Table({ children, ...props }: TableProps) {
  return <table {...props}>{children}</table>;
}

type THeadProps = {} & React.ComponentProps<"thead">;
function THead({ children, className, ...props }: THeadProps) {
  return (
    <thead
      className={cn("sticky top-0 w-full bg-accent-200 h-9 z-1", className)}
      {...props}
    >
      {children}
    </thead>
  );
}

type TBodyProps = {} & React.ComponentProps<"tbody">;
function TBody({ children, className, ...props }: TBodyProps) {
  return (
    <tbody
      className={cn("bg-background w-full overflow-auto text-sm", className)}
      {...props}
    >
      {children}
    </tbody>
  );
}

type TRowProps = {} & React.ComponentProps<"tr">;
function TRow({ children, ...props }: TRowProps) {
  return <tr {...props}>{children}</tr>;
}

export { Table, THead, TBody, TRow };
