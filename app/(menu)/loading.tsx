export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        </div>
        <h2 className="text-xl font-medium text-gray-700">Loading</h2>
        <p className="mt-2 text-sm text-gray-500">Please wait while we prepare your content...</p>
      </div>
    </div>
  )
}
