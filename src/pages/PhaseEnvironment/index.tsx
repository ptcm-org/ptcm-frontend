import useSWR from 'swr';
import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { getData } from '@/api/axios';

import { Response } from '@/interfaces/Response';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/Table/DataTable';
import { DataTableColumnHeader } from '@/components/Table/DataTableColumnHeader';
import DialogPhaseEnvironmentForm from './components/DialogPhaseEnvironmentForm';
import { DataPhaseEnvironmentTableRowActions } from './components/DataPhaseEnvironmentTableRowActions';

interface PhaseEnvironmentData {
  environmentalCode: string;
  mixingMediumDate: string;
  environmentalLabel: string;
  environmentCode: string;
  employeeId: string;
  environmentUnit: string;
  environmentalVolume: number;
  environmentalTime: number;
  potCode: string;
  batchOfPotCode: string;
  stirrerCode: string;
  stirringBatchCode: string;
  note: string;
}

type PhaseEnvironmentsResponse = Response<PhaseEnvironmentData>;

const PhaseEnvironment = () => {
  const [isOpenPhaseEnvironmentDialog, setOpenPhaseEnvironmentDialog] = useState(false);
  const { data, isLoading, error } = useSWR<PhaseEnvironmentsResponse>('/api/cellculturemedium', getData);

  const columnsEnvironment: ColumnDef<PhaseEnvironmentData>[] = [
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
      accessorKey: 'environmentalLabel',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nhãn MT" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('environmentalLabel')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'mixingMediumDate',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('mixingMediumDate')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'environmentCode',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Mã MT" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('environmentCode')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'batchOfPotCode',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Mẻ nồi" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('batchOfPotCode')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'environmentUnit',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Đơn vị" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('environmentUnit')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'environmentalVolume',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Dung tích" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('environmentalVolume')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'employeeId',
      header: ({ column }) => <DataTableColumnHeader column={column} title="NV Đổ" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('employeeId')}</span>
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => <DataPhaseEnvironmentTableRowActions row={row} />,
    },
  ];
  const openPhaseEnvironmentDialog = () => {
    setOpenPhaseEnvironmentDialog(true);
  };

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>failed to load</div>;
  return (
    <>
      <div className="flex flex-col gap-2 space-y-6 p-4 pt-4">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-medium">Danh Mục</h3>
            <p className="text-sm text-muted-foreground">Danh Mục sẽ được lưu trữ tại đây</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={openPhaseEnvironmentDialog}>Thêm pha môi trường</Button>
          </div>
        </div>
        <Separator />
        <Card>
          <CardHeader>
            <CardTitle>Bảng pha môi trường</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable data={data?.data} columns={columnsEnvironment} />
          </CardContent>
        </Card>
      </div>
      <DialogPhaseEnvironmentForm open={isOpenPhaseEnvironmentDialog} setOpen={setOpenPhaseEnvironmentDialog} />
    </>
  );
};

export default PhaseEnvironment;
