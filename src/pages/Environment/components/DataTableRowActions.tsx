import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Row } from '@tanstack/react-table';
import { useToast } from '@/components/ui/use-toast';
import { useSWRConfig } from 'swr';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DrawerEnvironmentTable from './DrawerEnvironmentTable';
import { DialogEnvironmentForm } from './DialogEnvironmentForm';
// import { changingCultureMediumControllerUpdateChangingCultureMedium } from '@/api/auth-proxies';

interface Invoice {
  invoice: string;
  paymentStatus: string;
  totalAmount: string;
  paymentMethod: string;
}

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  bioSelect:
  | {
      key: string;
      label: string;
    }[]
  | undefined;
shelvesSelect:
  | {
      key: string;
      label: string;
    }[]
  | undefined;
}

export function DataTableRowActions<TData>({ row ,bioSelect
  shelvesSelect}: DataTableRowActionsProps<TData>) {
  // const { toast } = useToast();
  // const { mutate } = useSWRConfig();
  const [openTable, setOpenTable] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const invoices: Invoice[] = [
    { invoice: 'INV001', paymentStatus: 'Paid', totalAmount: '$250.00', paymentMethod: 'Credit Card' },
  ];

  const openDialogForm = () => {
    setOpenForm(true);
    setOpenTable(false);
  };

  const openDialogTable = () => {
    setOpenTable(true);
    setOpenForm(false);
  };
  const onDelete = async () => {
    // const response =
    //   (await row) &&
    //   changingCultureMediumControllerUpdateChangingCultureMedium({
    //     id: (row.original as { id: string }).id,
    //     changingCultureMedium: { status: 'InActive' },
    //   });
    // if (response.statusCode === 200) {
    //   toast({
    //     title: 'Tạo nguyên liệu thành công',
    //   });
    //   await mutate('/api/changingculturemedium');
    // }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className={`flex h-8 w-8 p-0 ${openTable || openForm ? 'bg-muted' : ''}`}>
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={openDialogForm}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
          <DropdownMenuItem onClick={openDialogTable}>Show table</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DrawerEnvironmentTable invoices={invoices} open={openTable} setOpen={setOpenTable} />
      <DialogEnvironmentForm
        open={openForm}
        setOpen={setOpenForm}
        row={row}
        bioSelect={bioSelect}
        shelvesSelect={shelvesSelect}
      />
    </>
  );
}
