import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { useSWRConfig } from 'swr';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DialogEnvironmentForm from './DialogEnvironmentForm';
import { environmentControllerUpdateEnvironment } from '@/api/auth-proxies';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableEnvironmentRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const { toast } = useToast();
  const [isOpenEnvironmentDialog, setOpenEnvironmentDialog] = useState(false);
  const { mutate } = useSWRConfig();
  const openEnvironmentDialog = () => {
    setOpenEnvironmentDialog(true);
  };

  const onDelete = async () => {
    const response =
      (await row) &&
      environmentControllerUpdateEnvironment({
        id: row.original.id,
        environment: { environmentStatus: 'InActive' },
      });
    if (response.statusCode === 200) {
      toast({
        title: 'Tạo nguyên liệu thành công',
      });
      await mutate('api/environment');
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className={`flex h-8 w-8 p-0`}>
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={openEnvironmentDialog}>Chỉnh sửa</DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>Xóa</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogEnvironmentForm open={isOpenEnvironmentDialog} setOpen={setOpenEnvironmentDialog} row={row} />
    </>
  );
}
