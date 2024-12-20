export function LoadingView() {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#161F25]">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent mb-4 mx-auto"></div>
          <p className="text-emerald-500">Loading 3D View...</p>
        </div>
      </div>
    )
  }
  
  