import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import DialogCustomerForm from './components/DialogCustomerForm';
import { useState } from 'react';
import { Response } from '@/interfaces/Response';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/Table/DataTableColumnHeader';
import { Checkbox } from '@/components/ui/checkbox';
import DataCustomerTableRowActions from './components/DataCustomerTableRowActions';
import { getData } from '@/api/axios';
import useSWR from 'swr';
import { DataTable } from '@/components/Table/DataTable';

interface Customer {
  id: string;
  customerName: string;
  customerAddress1: string;
  customerAddress2: string;
  country: string;
  province: string;
  city: string;
  postalCode: string;
  emailAddress: string;
  phoneNumber: { [key: string]: string }; // assuming phoneNumber is an object with string keys and string values
  bunisseType: string;
  contactInfo: { [key: string]: string }; // assuming contactInfo is an object with string keys and string values
  status: string;
  createdAt: string;
  updatedAt: string;
  website: string;
}

type CustomerResponse = Response<Customer>;

const Customer = () => {
  const [isOpenCustomerDialog, setOpenCustomerDialog] = useState(false);
  const { data, isLoading, error } = useSWR<CustomerResponse>('api/customer', getData);

  const columnsCustomer: ColumnDef<Customer>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: any) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    // {
    //   accessorKey: 'id',
    //   header: ({ column }) => <DataTableColumnHeader column={column} title="Id" />,
    //   cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: 'customerName',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tên khách hàng" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('customerName')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'customerAddress1',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Địa chỉ 1" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('customerAddress1')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'customerAddress2',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Địa chỉ 2" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('customerAddress2')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'country',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Quốc gia" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('country')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'province',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tỉnh" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('province')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'city',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Thành phố" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('city')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'postalCode',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Mã bưu điện" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('postalCode')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'emailAddress',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Địa chỉ email" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('emailAddress')}</span>
          </div>
        );
      },
    },
    // {
    //   accessorKey: 'phoneNumber',
    //   header: ({ column }) => <DataTableColumnHeader column={column} title="Số điện thoại" />,
    //   cell: ({ row }) => {
    //     return (
    //       <div className="flex space-x-2">
    //         <span className="max-w-[500px] truncate font-medium">{row.getValue('phoneNumber')}</span>
    //       </div>
    //     );
    //   },
    // },
    {
      accessorKey: 'bunisseType',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Loại hình kinh doanh" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('bunisseType')}</span>
          </div>
        );
      },
    },
    // {
    //   accessorKey: 'contactInfo',
    //   header: ({ column }) => (
    //     <DataTableColumnHeader
    //       column={column}
    //       title="
    //   Thông tin liên lạc"
    //     />
    //   ),
    //   cell: ({ row }) => {
    //     return (
    //       <div className="flex space-x-2">
    //         <span className="max-w-[500px] truncate font-medium">{row.getValue('contactInfo')}</span>
    //       </div>
    //     );
    //   },
    // },
    {
      accessorKey: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('status')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'website',
      header: ({ column }) => <DataTableColumnHeader column={column} title="website" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('website')}</span>
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => <DataCustomerTableRowActions row={row} />,
    },
  ];
  const openCustomerDialog = () => {
    setOpenCustomerDialog(true);
  };

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>failed to load</div>;
  return (
    <>
      <div className="flex flex-col gap-2 space-y-6 p-4 pt-4">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-medium">Khách hàng</h3>
            <p className="text-sm text-muted-foreground"></p>
          </div>
          <div className="flex gap-2">
            <Button onClick={openCustomerDialog}>Thêm khách hàng</Button>
          </div>
        </div>
        <Separator />
        <Card>
          <CardHeader>
            <CardTitle>Bảng khách hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable data={data?.data} columns={columnsCustomer} fieldInputFilter={'customerName'} />
          </CardContent>
        </Card>
      </div>
      <DialogCustomerForm open={isOpenCustomerDialog} setOpen={setOpenCustomerDialog} />
    </>
  );
};

export default Customer;
