import useSWR from 'swr';
import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { getData } from '@/api/axios';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { DialogEnvironmentForm } from './components/DialogEnvironmentForm';
import { DataTableRowActions } from './components/DataTableRowActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/Table/DataTable';
import { DataTableColumnHeader } from '@/components/Table/DataTableColumnHeader';
import { convertArrayToObjectArray, generateFullName } from '@/helpers/convert';

interface ChangingCultureMedium {
  id: string;
  changingCultureDate: string;
  environmentalCode: string;
  cellCultureCode: string;
  boxId: string;
  transactionType: string;
  employeeId: string;
  environmentalVolume: number;
  childBags: number;
  bagCode: string;
  changingCultureMediumTime: number;
  environmentRoomCode: string;
  environmentShelveCode: string;
  changingCultureMediumCode: string;
  customerWeek: string;
  bagBox: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

type Response<T> = {
  statusCode: number;
  message: string;
  data: T[];
};

interface Employee {
  id: string;
  employeeId: string;
  jobTitleCd: string;
  departmentId: string;
  teamId: string;
  directManagerId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  nickName: string;
  email: string;
  status: string;
  gender: string;
  dob: string;
  createdAt: string;
  updatedAt: string;
}

type Shelf = {
  id: string;
  shelveName: string;
  shelveDescription: string;
  shelveLevels: number;
  shelveCode: string;
  shelveIndex: string;
  status: 'Occupied';
};

type ChangingCultureMediumsResponse = Response<ChangingCultureMedium>;
type BioemployeesResponse = Response<Employee>;
type ShelvesResponse = Response<Shelf>;

const Environment = () => {
  const [isAddTaskDialogOpen, setAddTaskDialogOpen] = useState(false);

  const {
    data: changingculturemediums,
    isLoading: changingculturemediumsLoading,
    error: changingculturemediumsError,
  } = useSWR<ChangingCultureMediumsResponse>('/api/changingculturemedium', getData);
  const {
    data: shelves,
    isLoading: shelvesLoading,
    error: shelvesError,
  } = useSWR<ShelvesResponse>('/api/shelve', getData);
  const {
    data: bioemployees,
    isLoading: bioemployeesLoading,
    error: bioemployeesError,
  } = useSWR<BioemployeesResponse>('/api/bioemployee', getData);
  const bioSelect = convertArrayToObjectArray(bioemployees?.data, 'employeeId', undefined, generateFullName);
  const shelvesSelect = convertArrayToObjectArray(shelves?.data, 'id', 'shelveName');

  const columns: ColumnDef<ChangingCultureMedium>[] = [
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
    //   header: ({ column }) => <DataTableColumnHeader column={column} title="Task" />,
    //   cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: 'changingCultureMediumCode',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Mã phiếu đổ môi trường - nhập vào" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('changingCultureMediumCode')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'changingCultureDate',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày đổ môi trường" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('changingCultureDate')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'customerWeek',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tuần Khách hàng" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('customerWeek')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'environmentalCode',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Mã môi trường" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('environmentalCode')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'boxId',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Box" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('boxId')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'transactionType',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nhập xuất" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('transactionType')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'environmentalVolume',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Dung tích (Lít)" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('environmentalVolume')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'bagCode',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Mã túi" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('bagCode')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'childBags',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Túi con" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('childBags')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'bagBox',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Thùng túi" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('bagBox')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'environmentRoomCode',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Phòng MT" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('environmentRoomCode')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'environmentShelveCode',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Kệ MT" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {shelvesSelect?.find((shelve) => shelve.key === row.getValue('environmentShelveCode'))?.label}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'employeeId',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nhân viên đổ" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {bioSelect?.find((bio) => bio.key === row.getValue('employeeId'))?.label}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'changingCultureMediumTime',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Thời gian (Phút)" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('changingCultureMediumTime')}</span>
          </div>
        );
      },
    },
    // {
    //   accessorKey: 'staff',
    //   header: ({ column }) => <DataTableColumnHeader column={column} title="Nhân viên" />,
    //   cell: ({ row }) => {
    //     return (
    //       <div className="flex space-x-2">
    //         <span className="max-w-[500px] truncate font-medium">{row.getValue('staff')}</span>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   accessorKey: 'dateAdded',
    //   header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày nhập" />,
    //   cell: ({ row }) => {
    //     return (
    //       <div className="flex space-x-2">
    //         <span className="max-w-[500px] truncate font-medium">{row.getValue('dateAdded')}</span>
    //       </div>
    //     );
    //   },
    // },
    {
      accessorKey: 'note',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ghi chú" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('note')}</span>
          </div>
        );
      },
    },

    {
      id: 'actions',
      cell: ({ row }) => <DataTableRowActions row={row} bioSelect={bioSelect} shelvesSelect={shelvesSelect} />,
    },
  ];

  const openAddTaskDialog = () => {
    setAddTaskDialogOpen(true);
  };

  if (changingculturemediumsLoading && shelvesLoading && bioemployeesLoading) return <div>loading...</div>;
  if (changingculturemediumsError && bioemployeesError && shelvesError) return <div>failed to load</div>;
  return (
    <>
      <div className="flex flex-col gap-2 space-y-6 p-4 pt-4">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-medium">Môi Trường</h3>
            <p className="text-sm text-muted-foreground">Môi Trường sẽ được lưu trữ tại đây</p>
          </div>
          <Button onClick={openAddTaskDialog}>Add</Button>
        </div>
        <Separator />
        <Card className="">
          <CardHeader>
            <CardTitle>Bảng Môi Trường</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable data={changingculturemediums?.data} columns={columns} />
          </CardContent>
        </Card>
      </div>
      <DialogEnvironmentForm
        open={isAddTaskDialogOpen}
        setOpen={setAddTaskDialogOpen}
        bioSelect={bioSelect}
        shelvesSelect={shelvesSelect}
      />
    </>
  );
};
export default Environment;
