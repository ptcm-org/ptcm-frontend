import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

import { DialogEnvironmentForm } from './components/DialogEnvironmentForm';
import { DataTableRowActions } from './components/DataTableRowActions';

import { EnvironmentType } from './data/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/Table/DataTable';
import { DataTableColumnHeader } from '@/components/Table/DataTableColumnHeader';
import { Input } from '@/components/ui/input';
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from '@/components/ui/select';

const Environment = () => {
  const [isAddTaskDialogOpen, setAddTaskDialogOpen] = useState(false);

  const environments = [
    {
      id: 1,
      formCode: 1,
      phaseLabel: 'test',
      date: '123',
      weekKH: '1',
      treeGroup: 'test',
      box: '1',
      importExport: 'test',
      capacity: '1',
      bagCode: 1,
      tChild: '1',
      bagBox: '1',
      environmentRoom: 1,
      environmentalShelves: 1,
      nvPour: '1',
      minute: '1',
      staff: '1',
      dateAdded: '1',
      note: '1',
    },
    {
      id: 2,
      formCode: 2,
      phaseLabel: 'production',
      date: '456',
      weekKH: '2',
      treeGroup: 'production_group',
      box: '2',
      importExport: 'production_export',
      capacity: '2',
      bagCode: 2,
      tChild: '2',
      bagBox: '2',
      environmentRoom: 2,
      environmentalShelves: 2,
      nvPour: '2',
      minute: '2',
      staff: '2',
      dateAdded: '2',
      note: '2',
    },
    {
      id: 3,
      formCode: 3,
      phaseLabel: 'development',
      date: '789',
      weekKH: '3',
      treeGroup: 'development_group',
      box: '3',
      importExport: 'development_export',
      capacity: '3',
      bagCode: 3,
      tChild: '3',
      bagBox: '3',
      environmentRoom: 3,
      environmentalShelves: 3,
      nvPour: '3',
      minute: '3',
      staff: '3',
      dateAdded: '3',
      note: '3',
    },
    {
      id: 4,
      formCode: 4,
      phaseLabel: 'maintenance',
      date: '101112',
      weekKH: '4',
      treeGroup: 'maintenance_group',
      box: '4',
      importExport: 'maintenance_export',
      capacity: '4',
      bagCode: 4,
      tChild: '4',
      bagBox: '4',
      environmentRoom: 4,
      environmentalShelves: 4,
      nvPour: '4',
      minute: '4',
      staff: '4',
      dateAdded: '4',
      note: '4',
    },
  ];

  const columns: ColumnDef<EnvironmentType>[] = [
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
      accessorKey: 'phaseLabel',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Mã phiếu" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('phaseLabel')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'date',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('date')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'weekKH',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tuần KH" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('weekKH')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'treeGroup',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nhóm cây" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('treeGroup')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'box',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Box" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('box')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'importExport',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nhập xuất" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('importExport')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'capacity',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Dung tích (Lít)" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('capacity')}</span>
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
      accessorKey: 'tChild',
      header: ({ column }) => <DataTableColumnHeader column={column} title="T.Con" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('tChild')}</span>
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
      accessorKey: 'environmentRoom',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Phòng MT" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('environmentRoom')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'environmentalShelves',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Kệ MT" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('environmentalShelves')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'nvPour',
      header: ({ column }) => <DataTableColumnHeader column={column} title="NV Đổ" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('nvPour')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'minute',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Thời gian (Phút)" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('minute')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'staff',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Nhân viên" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('staff')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'dateAdded',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ngày nhập" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('dateAdded')}</span>
          </div>
        );
      },
    },
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
      cell: ({ row }) => <DataTableRowActions row={row} />,
    },
  ];

  const openAddTaskDialog = () => {
    setAddTaskDialogOpen(true);
  };

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
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mx-auto my-6 rounded-md bg-white p-6 shadow">
              <form>
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium" htmlFor="date">
                      Ngày
                    </label>
                    <Input id="date" placeholder="dd/mm/yyyy" type="text" />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium" htmlFor="nhanPha">
                      Nhãn Pha
                    </label>
                    <Input id="nhanPha" type="text" />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium" htmlFor="nhomCay">
                      Nhóm Cây
                    </label>
                    <Input id="nhomCay" type="text" />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium" htmlFor="box">
                      Box
                    </label>
                    <Select>
                      <SelectTrigger id="box">
                        <SelectValue placeholder="Chọn" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium" htmlFor="nhapXuat">
                      Nhập Xuất
                    </label>
                    <Select>
                      <SelectTrigger id="nhapXuat">
                        <SelectValue placeholder="Chọn" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="nhap">Nhập</SelectItem>
                        <SelectItem value="xuat">Xuất</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium" htmlFor="nvDo">
                      Nv Độ
                    </label>
                    <Input id="nvDo" type="text" />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium" htmlFor="dungTich">
                      Dung Tích (Lit)
                    </label>
                    <Input id="dungTich" placeholder="0,0" type="text" />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium" htmlFor="tCon">
                      T.Con
                    </label>
                    <Input id="tCon" placeholder="0" type="text" />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium" htmlFor="maTui">
                      Mã Túi
                    </label>
                    <Select>
                      <SelectTrigger id="maTui">
                        <SelectValue placeholder="Chọn" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="tui1">Túi 1</SelectItem>
                        <SelectItem value="tui2">Túi 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium" htmlFor="tGian">
                      TGian (phút)
                    </label>
                    <Input id="tGian" type="text" />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium" htmlFor="phongMT">
                      Phòng MT
                    </label>
                    <Select>
                      <SelectTrigger id="phongMT">
                        <SelectValue placeholder="Chọn" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="phong1">Phòng 1</SelectItem>
                        <SelectItem value="phong2">Phòng 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium" htmlFor="keMT">
                      Kệ MT
                    </label>
                    <Select>
                      <SelectTrigger id="keMT">
                        <SelectValue placeholder="Chọn" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="ke1">Kệ 1</SelectItem>
                        <SelectItem value="ke2">Kệ 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium" htmlFor="maPhieu">
                      Mã Phiếu
                    </label>
                    <Input id="maPhieu" type="text" />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium" htmlFor="tuanKH">
                      Tuần KH
                    </label>
                    <Input id="tuanKH" type="text" />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium" htmlFor="thungTui">
                      Thùng Túi
                    </label>
                    <Input id="thungTui" type="text" />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium" htmlFor="ghiChu">
                      Ghi Chú
                    </label>
                    <Input id="ghiChu" type="text" />
                  </div>
                </div>
              </form>
            </div>
          </CardContent>
          <CardContent>
            <DataTable data={environments} columns={columns} fieldInputFilter={'phaseLabel'} />
          </CardContent>
        </Card>
      </div>
      <DialogEnvironmentForm open={isAddTaskDialogOpen} setOpen={setAddTaskDialogOpen} />
    </>
  );
};

export default Environment;
