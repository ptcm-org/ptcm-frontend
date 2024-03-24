import { Row } from '@tanstack/react-table';
import { useState } from 'react';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DialogCustomerForm from './DialogCustomerForm';
import { customerControllerUpdateCustomer } from '@/api/auth-proxies';
import { useSWRConfig } from 'swr';
import { useToast } from '@/components/ui/use-toast';

const DataCustomerTableRowActions: React.FC<DataTableRowActionsProps<any>> = ({ row }) => {
  const { toast } = useToast();
  const { mutate } = useSWRConfig();
  const [openForm, setOpenForm] = useState(false);
  const openDialogForm = () => {
    setOpenForm(true);
  };

  const onDelete = async () => {
    if (row) {
      const { id } = row.original as { id: string };
      const response = await customerControllerUpdateCustomer({
        id,
        customer: { status: 'InActive' },
      });
      if (response.statusCode === 200) {
        toast({
          title: 'Cập nhật thành công',
        });
        await mutate('api/customer');
      }
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className={`flex h-8 w-8 p-0 ${openForm ? 'bg-muted' : ''}`}>
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={openDialogForm}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogCustomerForm open={openForm} setOpen={setOpenForm} row={row} />
    </>
  );
};

export default DataCustomerTableRowActions;
