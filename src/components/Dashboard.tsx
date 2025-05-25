import React from 'react';
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
        </SidebarInset>
      </SidebarProvider>

    </div>
  );
};

export default Dashboard; 