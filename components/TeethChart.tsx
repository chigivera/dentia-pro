import type React from "react"

const TeethChart: React.FC = () => {
  // This is a simplified teeth chart. In a real application, you'd want to make this interactive
  // and able to highlight specific teeth based on the patient's dental records.
  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-16 gap-1 mb-4">
        {[...Array(16)].map((_, i) => (
          <div
            key={`upper-${i + 1}`}
            className="w-8 h-12 bg-gray-200 border border-gray-300 flex items-center justify-center text-xs"
          >
            {16 - i}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-16 gap-1">
        {[...Array(16)].map((_, i) => (
          <div
            key={`lower-${i + 1}`}
            className="w-8 h-12 bg-gray-200 border border-gray-300 flex items-center justify-center text-xs"
          >
            {i + 17}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeethChart

