export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center px-2 py-2 md:py-4">
        {children}
    </section>
  );
}
