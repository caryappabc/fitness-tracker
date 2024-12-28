import { Dumbbell, ScrollText,Home, ContactRound, Lightbulb, Settings, LayoutDashboard } from "lucide-react"
import Link from 'next/link'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"

// Menu items.
const items = [

  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Leaderboard",
    url: "/dashboard/stats",
    icon: LayoutDashboard,
  },
  {
    title: "Log progress",
    url: "/dashboard/log",
    icon: ScrollText,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: ContactRound ,
  },
  {
    title: "Tips",
    url: "/dashboard/tips",
    icon: Lightbulb,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarContent>
        <SidebarHeader className="px-5 pt-8 pb-3 flex-row gap-x-8 group-data-[collapsible=icon]:hidden">
            <Dumbbell /> <Link href="/dashboard">Fitness Tracker</Link>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem className="pt-2 pb-2" key={item.title}>
                  
                  <SidebarMenuButton asChild>
                    <a href={item.url} title={item.title}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="group-data-[collapsible=icon]:hidden">
          <p className="text-center text-xs italic">IMS 2025 - Fitness all the way</p>
        </SidebarFooter>
    </Sidebar>
  )
}
