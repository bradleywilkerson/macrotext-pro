import React from 'react';
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

const Dashboard: React.FC = () => {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Dashboard; 