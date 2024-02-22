import { Outlet, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useState } from 'react';

// Component
import Lazy from '@/components/Lazy';
import { Separator } from '@/components/ui/separator';
import { sidebarNavItems } from '@/constants';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Nav } from '../Nav';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { SettingsIcon } from 'lucide-react';
import Customizer from '@/components/Customizer';

const Layout = () => {
  const navigate = useNavigate();
  const layout = localStorage.getItem('layout') || null;
  const collapsed = localStorage.getItem('collapsed') || null;
  const defaultLayout = layout ? JSON.parse(layout) : [265, 1095];
  const defaultCollapsed = collapsed ? JSON.parse(collapsed) : false;
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const navCollapsedSize = 4;

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          localStorage.setItem('layout', JSON.stringify(sizes));
        }}
        className="h-full  items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onResize={(size: any) => {
            let isCollapsed = size < 10;
            setIsCollapsed(isCollapsed);
            localStorage.setItem('collapsed', JSON.stringify(isCollapsed));
          }}
          className={cn(isCollapsed && 'transition-all duration-300 ease-in-out')}
        >
          <div className="flex min-h-14 items-center p-2">
            <div
              className="w-full"
              // className={cn('w-full flex-1', isCollapsed ? 'w-full' : 'w-[80%]')}
            ></div>
          </div>
          <Separator />
          <Nav isCollapsed={isCollapsed} links={sidebarNavItems} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div className="flex items-center justify-between px-4 py-2">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="rounded-full" size="icon" variant="outline">
                    <SettingsIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="center"
                  className="z-40 w-[340px] rounded-[0.5rem] bg-white p-6 dark:bg-zinc-950"
                >
                  <Customizer />
                </PopoverContent>
              </Popover>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/user')}>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Separator />
          <Lazy>
            <Outlet />
          </Lazy>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default Layout;
