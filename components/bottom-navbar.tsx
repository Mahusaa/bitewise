"use client"

import { usePathname, useRouter } from "next/navigation"
import { Home, PlusCircle, User } from "lucide-react"

const navItems = [
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: PlusCircle, label: "Add", path: "/add-food" },
  { icon: User, label: "Profile", path: "/settings" },
]

export function BottomNavbar() {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (path: string) => pathname.startsWith(path)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-sm">
      <div className="flex justify-between px-4">
        {navItems.map((item) => {
          const active = isActive(item.path)
          const Icon = item.icon

          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`flex flex-col items-center justify-center gap-1 py-2 w-full transition-colors duration-200 ${active ? "text-primary border-t-2 border-primary" : "text-muted-foreground"
                }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[11px] font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

