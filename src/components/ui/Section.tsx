import { cn } from "@/lib/utils";

type SectionProps = {} & React.ComponentPropsWithoutRef<"div">;

function Section({ children, className, ...props }: SectionProps) {
  return (
    <div
      className={cn(
        "w-full border-dashed divide-y divide-accent-300 divide-dashed",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type HeaderProps = {} & React.ComponentPropsWithoutRef<"div">;

function Header({ children, className, ...props }: HeaderProps) {
  return (
    <div className={cn("w-full flex justify-end items-center", className)} {...props}>
      <div className="flex items-center gap-4">{children}</div>
    </div>
  );
}

type BodyProps = {} & React.ComponentPropsWithRef<"div">;
function Content({ children, className, ref, ...props }: BodyProps) {
  return (
    <div className={cn("w-full px-6 py-1.5", className)} {...props}>
      <div ref={ref} className="w-full h-full">
        {children}
      </div>
    </div>
  );
}

type SelectionsProps = {} & React.ComponentProps<"div">;

function Selections({ children, className, ...props }: SelectionsProps) {
  return (
    <div
      className={cn(
        "flex items-center text-sm divide-x divide-accent-300 overflow-hidden",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type ButtonProps = {
  active: boolean;
} & React.ComponentProps<"button">;

function Button({ active, children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "flex justify-center items-center min-w-8 h-6.5 cursor-pointer border-accent-300 text-xs",
        active
          ? "text-background bg-black [&>svg]:stroke-background"
          : "[&>svg]:stroke-primary hover:bg-accent-200 transition-colors duration-100",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export { Section, Header, Content, Selections, Button };
