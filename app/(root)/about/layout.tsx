export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="justify-center inline-block text-center">
        {children}
      </div>
    </section>
  );
}
