import { useContext, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { CheckIcon, MoonIcon, SunIcon } from 'lucide-react';
import { InfoCircledIcon, ResetIcon } from '@radix-ui/react-icons';

// Constants
import { themes } from '@/constants/theme';

// Theme
import { NameTheme, ThemeColorContext } from '@/theme/theme-wrapper';

// COmponents
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';

const Customizer = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme: setMode, resolvedTheme: mode } = useTheme();
  const themeContext = useContext(ThemeColorContext);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="flex items-start pt-4 md:pt-0">
        <div className="space-y-1 pr-2">
          <div className="font-semibold leading-none tracking-tight">Customize</div>
          <div className="text-xs text-muted-foreground">Pick a style and color for your components.</div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto rounded-[0.5rem]"
          onClick={() => {
            themeContext.handleSetConfigThemeColor(themes[0].name as NameTheme);
          }}
        >
          <ResetIcon />
          <span className="sr-only">Reset</span>
        </Button>
      </div>
      <div className="flex flex-1 flex-col space-y-4 md:space-y-6">
        <div className="space-y-1.5">
          <div className="flex w-full items-center">
            <Label className="text-xs">Style</Label>
            <Popover>
              <PopoverTrigger>
                <InfoCircledIcon className="ml-1 h-3 w-3" />
                <span className="sr-only">About styles</span>
              </PopoverTrigger>
              <PopoverContent
                className="space-y-3 rounded-[0.5rem] text-sm"
                side="right"
                align="start"
                alignOffset={-20}
              >
                <p className="font-medium">What is the difference between the New York and Default style?</p>
                <p>A style comes with its own set of components, animations, icons and more.</p>
                <p>
                  The <span className="font-medium">Default</span> style has larger inputs, uses lucide-react for icons
                  and tailwindcss-animate for animations.
                </p>
                <p>
                  The <span className="font-medium">New York</span> style ships with smaller buttons and cards with
                  shadows. It uses icons from Radix Icons.
                </p>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Color</Label>
          <div className="grid grid-cols-3 gap-2">
            {themes.map((theme) => {
              const isActive = themeContext.configThemeColor === theme.name;

              return mounted ? (
                <Button
                  variant={'outline'}
                  size="sm"
                  key={theme.name}
                  onClick={() => {
                    themeContext.handleSetConfigThemeColor(theme.name as NameTheme);
                  }}
                  className={cn('justify-start', isActive && 'border-2 border-primary')}
                  style={
                    {
                      '--theme-primary': `hsl(${theme?.activeColor[mode === 'dark' ? 'dark' : 'light']})`,
                    } as React.CSSProperties
                  }
                >
                  <span
                    className={cn(
                      'mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary]',
                    )}
                  >
                    {isActive && <CheckIcon className="h-4 w-4 text-white" />}
                  </span>
                  {theme.label}
                </Button>
              ) : (
                <Skeleton className="h-8 w-full" key={theme.name} />
              );
            })}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Mode</Label>
          <div className="grid grid-cols-3 gap-2">
            {mounted ? (
              <>
                <Button
                  variant={'outline'}
                  size="sm"
                  onClick={() => setMode('light')}
                  className={cn(mode === 'light' && 'border-2 border-primary')}
                >
                  <SunIcon className="mr-1 -translate-x-1" />
                  Light
                </Button>
                <Button
                  variant={'outline'}
                  size="sm"
                  onClick={() => setMode('dark')}
                  className={cn(mode === 'dark' && 'border-2 border-primary')}
                >
                  <MoonIcon className="mr-1 -translate-x-1" />
                  Dark
                </Button>
              </>
            ) : (
              <>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Customizer;
