import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Link, useLocation } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button';

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: 'default' | 'ghost';
    href: string;
  }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  const { pathname } = useLocation();

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:items-center data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  key={index}
                  to={link.href}
                  className={cn(
                    buttonVariants({ variant: pathname === link.href ? 'default' : 'ghost', size: 'icon' }),
                    'h-8 w-8',
                    pathname === link.href && 'dark:bg-muted dark:text-muted-foreground',
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && <span className="ml-auto text-muted-foreground">{link.label}</span>}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              to={link.href}
              className={cn(
                buttonVariants({ variant: pathname === link.href ? 'default' : 'ghost', size: 'sm' }),
                pathname === link.href && 'dark:bg-muted dark:text-white',
                'justify-start',
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && (
                <span className={cn('ml-auto', pathname === link.href && 'text-background dark:text-white')}>
                  {link.label}
                </span>
              )}
            </Link>
          ),
        )}
      </nav>
    </div>
  );
}
