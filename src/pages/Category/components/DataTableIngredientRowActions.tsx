import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Row } from '@tanstack/react-table';

// Proxies
import { environmentControllerUpdateEnvironmentIngredient } from '@/api/auth-proxies';

// Components
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DialogIngredientForm from './DialogIngredientForm';
import { useToast } from '@/components/ui/use-toast';
import { mutate } from 'swr';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableIngredientRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const { toast } = useToast();
  const [isOpenIngredientDialog, setOpenIngredientDialog] = useState(false);
  const openIngredientDialog = () => {
    setOpenIngredientDialog(true);
  };

  const onDelete = async () => {
    const response =
      (await row) &&
      environmentControllerUpdateEnvironmentIngredient({
        id: (row.original as { id: string }).id,
        environmentIngredient: { status: 'InActive' },
      });
    if (response.statusCode === 200) {
      toast({
        title: 'Tạo nguyên liệu thành công',
      });
      await mutate('api/environment/ingredients');
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
          <DropdownMenuItem onClick={openIngredientDialog}>Chỉnh sửa</DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>Xóa</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogIngredientForm open={isOpenIngredientDialog} setOpen={setOpenIngredientDialog} row={row} />
    </>
  );
}
