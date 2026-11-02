import Header from "./Header";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="w-full h-full flex flex-col items-center gap-3 min-h-200 [&_div]:min-h-0 pb-3">
      <Header />
      {children}
    </div>
  );
}
