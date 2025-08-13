export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="items-center justify-center px-2 py-2 md:py-4">
        {children}
    </section>
  );
}
