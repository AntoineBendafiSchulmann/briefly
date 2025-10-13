'use client';

import { ReactNode, useState } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { Edit, History, Home, BarChart, Settings, PanelLeft, PanelRight, FileText } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useTheme();
  const pathname = usePathname();

  console.log('Current theme:', theme);

  return (
    <SidebarProvider>
      <div
        className={`flex flex-col min-h-screen ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}
      >
        <div className="flex h-[calc(100vh-3.5rem)]">
          {/* sidebar */}
          <Sidebar
            className={`${
              collapsed ? 'w-14' : 'w-56'
            } fixed left-0 top-[4.28rem] h-[calc(100vh-4.0rem)] ${
              theme === 'dark' ? 'bg-background' : 'bg-gray-100 border-r border-gray-300'
            }`}
            collapsible="none"
          >
            <SidebarContent>
              <SidebarMenu>
                {/* toggle sidebar button */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setCollapsed(!collapsed)}
                    aria-label="Toggle Sidebar"
                    className="flex items-center gap-2 py-2"
                  >
                    {collapsed ? <PanelLeft className="h-4 w-4" /> : <PanelRight className="h-4 w-4" />}
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* dashboard */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      href="/dashboard"
                      className={`flex items-center gap-2 ${
                        pathname === '/dashboard'
                          ? theme === 'dark'
                            ? 'bg-gray-800 text-white'
                            : 'bg-gray-200 text-black'
                          : ''
                      }`}
                    >
                      <Home className="h-4 w-4" />
                      {!collapsed && <span>Dashboard</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* documents */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      href="/dashboard/documents"
                      className={`flex items-center gap-2 ${
                        pathname === '/dashboard/documents'
                          ? theme === 'dark'
                            ? 'bg-gray-800 text-white'
                            : 'bg-gray-200 text-black'
                          : ''
                      }`}
                    >
                      <FileText className="h-4 w-4" />
                      {!collapsed && <span>Documents</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* reformulation */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      href="/dashboard/reformulation"
                      className={`flex items-center gap-2 ${
                        pathname === '/dashboard/reformulation'
                          ? theme === 'dark'
                            ? 'bg-gray-800 text-white'
                            : 'bg-gray-200 text-black'
                          : ''
                      }`}
                    >
                      <Edit className="h-4 w-4" />
                      {!collapsed && <span>Reformulation</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* historique */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      href="/dashboard/historique"
                      className={`flex items-center gap-2 ${
                        pathname === '/dashboard/historique'
                          ? theme === 'dark'
                            ? 'bg-gray-800 text-white'
                            : 'bg-gray-200 text-black'
                          : ''
                      }`}
                    >
                      <History className="h-4 w-4" />
                      {!collapsed && <span>Historique</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* statistiques */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      href="/dashboard/statistiques"
                      className={`flex items-center gap-2 ${
                        pathname === '/dashboard/statistiques'
                          ? theme === 'dark'
                            ? 'bg-gray-800 text-white'
                            : 'bg-gray-200 text-black'
                          : ''
                      }`}
                    >
                      <BarChart className="h-4 w-4" />
                      {!collapsed && <span>Statistiques</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* paramètres */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      href="/dashboard/parametres"
                      className={`flex items-center gap-2 ${
                        pathname === '/dashboard/parametres'
                          ? theme === 'dark'
                            ? 'bg-gray-800 text-white'
                            : 'bg-gray-200 text-black'
                          : ''
                      }`}
                    >
                      <Settings className="h-4 w-4" />
                      {!collapsed && <span>Paramètres</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          {/* page content */}
            <main
            className={`flex-1 overflow-auto transition-all ${
                collapsed ? 'ml-14' : 'ml-56'
            }`}
            >
            <div className="w-full min-h-[calc(100vh-3.5rem)] p-8">
            {children}
            </div>
            </main>

        </div>
      </div>
    </SidebarProvider>
  );
}
