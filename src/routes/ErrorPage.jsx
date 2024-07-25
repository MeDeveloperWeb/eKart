export default function ErrorPage() {
  return (
    <div className="flex h-[100vh] flex-col items-center justify-center">
      <h1 className="text-8xl">404</h1>
      <p data-testid="error-text">Page not found</p>
    </div>
  );
}
