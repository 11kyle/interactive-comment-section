export default function Card({ children }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow m-4">
      <div className="px-4 py-5 sm:p-6">
        {children}
      </div>
    </div>
  )
}
