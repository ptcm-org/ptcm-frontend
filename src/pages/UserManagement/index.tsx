import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { DialogEnvironmentForm } from '../Environment/components/DialogEnvironmentForm';
import { DataTable } from '@/components/Table/DataTable';
import { statuses } from '@/constants';
import { DataTableColumnHeader } from '@/components/Table/DataTableColumnHeader';
import { User } from './schema';

const UserManagement = () => {
  const [isAddTaskDialogOpen, setAddTaskDialogOpen] = useState(false);

  const users = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      middleName: 'Smith',
      role: 'Administrator',
      implantationGroup: 'Nhóm 1',
      phone: '123456789',
      email: 'john.doe@example.com',
      status: 'Active',
      gender: 'Male',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      middleName: 'Ann',
      role: 'Manager',
      implantationGroup: 'Nhóm 2',
      phone: '987654321',
      email: 'jane.doe@example.com',
      status: 'Active',
      gender: 'Female',
    },
    {
      id: 3,
      firstName: 'Alice',
      lastName: 'Smith',
      middleName: 'Marie',
      role: 'Staff',
      implantationGroup: 'Nhóm 1',
      phone: '555123456',
      email: 'alice.smith@example.com',
      status: 'Inactive',
      gender: 'Female',
    },
  ];

  const columns: ColumnDef<User>[] = [
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
    {
      accessorKey: 'id',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Task" />,
      cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'firstName',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
      cell: ({ row }) => {
        const { firstName, middleName, lastName } = row.original;
        const fullName = `${firstName} ${middleName} ${lastName}`;

        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{fullName}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'email',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('email')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'phone',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Phone" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('phone')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'implantationGroup',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nhóm cấy" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('implantationGroup')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'role',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('role')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
        const status = row.getValue('status');

        return (
          <div className="flex w-[100px] items-center">
            <Checkbox checked={status === 'Active'} />
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    // {
    //   id: 'actions',
    //   cell: ({ row }) => <DataTableRowActions row={row} />,
    // },
  ];

  const facetedFilters = [
    {
      field: 'status',
      options: statuses,
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-2 space-y-6 p-4 pt-4">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-medium">Quản lí nhân viên</h3>
            <p className="text-sm text-muted-foreground">Quản lí nhân viên sẽ được lưu trữ tại đây</p>
          </div>
        </div>
        <Separator />
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable data={users} columns={columns} fieldInputFilter={'email'} facetedFilters={facetedFilters} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default UserManagement;
