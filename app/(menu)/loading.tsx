export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-muted rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
          </div>
        </div>
        <h2 className="text-xl font-medium text-primary">Loading</h2>
        <p className="mt-2 text-sm text-secondary-foreground">Please wait while we prepare your content...</p>
      </div>
    </div>
  )
}
