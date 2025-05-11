// app/components/BottomNavbar.tsx
"use client"

import { usePathname, useRouter } from "next/navigation"
import { Home, PlusCircle } from "lucide-react"

const navItems = [
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: PlusCircle, label: "Add", path: "/add-food" },
]

export function BottomNavbar() {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (path: string) => pathname.startsWith(path)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-sm">
      <div className="flex justify-between px-4">
        {navItems.map((item) => {
          const active = isActive(item.path)
          const Icon = item.icon

          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`flex flex-col items-center justify-center gap-1 py-2 w-full transition-colors duration-200 ${active ? "text-indigo-600" : "text-gray-400"
                }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[11px] font-medium">{item.label}</span>
              {active && <div className="w-full h-0.5 bg-indigo-600 rounded-t mt-1" />}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

