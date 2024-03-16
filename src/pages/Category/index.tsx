import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import useSWR from 'swr';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/Table/DataTable';
import { DataTableColumnHeader } from '@/components/Table/DataTableColumnHeader';
import { getData } from '@/api/axios';
import DialogIngredientForm from './components/DialogIngredientForm';
import { DataTableIngredientRowActions } from './components/DataTableIngredientRowActions';
import DialogEnvironmentForm from './components/DialogEnvironmentForm';
import { DataTableEnvironmentRowActions } from './components/DataTableEnviromentRowActions';

interface CommonData {
  id: string;
  status: 'Active' | 'Inactive';
  barCode: string;
}

interface EnvironmentData extends CommonData {
  environmentCode: string;
  environmentName: string;
  environmentDescription: string;
  quantityInStock: number;
  environmentUnit: string;
  environmentFormula: string;
  createdAt: string;
  updatedAt: string;
}

interface IngredientData extends CommonData {
  ingredientCode: string;
  ingredientName: string;
  ingredientUnit: string;
  ingredientDescription: string;
}

type Response<T> = {
  statusCode: number;
  message: string;
  data: T[];
};

type EnvironmentsResponse = Response<EnvironmentData>;
type IngredientsResponse = Response<IngredientData>;

const Category = () => {
  const [isOpenIngredientDialog, setOpenIngredientDialog] = useState(false);
  const [isOpenEnvironmentDialog, setOpenEnvironmentDialog] = useState(false);
  const {
    data: environments,
    isLoading: isLoadingEnvironments,
    error,
  } = useSWR<EnvironmentsResponse>('api/environment', getData);
  const {
    data: ingredients,
    isLoading: isLoadingIngredients,
    error: errorIngredients,
  } = useSWR<IngredientsResponse>('api/environment/ingredients', getData);

  const openIngredientDialog = () => {
    setOpenIngredientDialog(true);
  };
  const openEnvironmentDialog = () => {
    setOpenEnvironmentDialog(true);
  };

  const columnsEnvironment: ColumnDef<EnvironmentData>[] = [
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
      accessorKey: 'environmentCode',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Mã Code" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('environmentCode')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'environmentName',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tên Môi trường" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('environmentName')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'environmentDescription',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Chi tiết" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('environmentDescription')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'quantityInStock',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Số lượng tồn" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('quantityInStock')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'environmentUnit',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Đơn vị tính" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('environmentUnit')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'environmentFormula',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Công thức" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('environmentFormula')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'environmentStatus',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Trạng thái" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('environmentStatus')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'barCode',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Mã barcode" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('barCode')}</span>
          </div>
        );
      },
    },

    {
      id: 'actions',
      cell: ({ row }) => <DataTableEnvironmentRowActions row={row} />,
    },
  ];
  const columnsIngredients: ColumnDef<IngredientData>[] = [
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
      accessorKey: 'ingredientCode',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Mã Code" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('ingredientCode')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'ingredientName',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tên nguyên liệu" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('ingredientName')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'ingredientUnit',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Đơn vị tính" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('ingredientUnit')}</span>
          </div>
        );
      },
    },
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
      accessorKey: 'barCode',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Mã barcode" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">{row.getValue('barCode')}</span>
          </div>
        );
      },
    },

    {
      id: 'actions',
      cell: ({ row }) => <DataTableIngredientRowActions row={row} />,
    },
  ];

  if (isLoadingEnvironments || isLoadingIngredients) return <div>loading...</div>;
  if (error || errorIngredients) return <div>failed to load</div>;
  return (
    <>
      <div className="flex flex-col gap-2 space-y-6 p-4 pt-4">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-medium">Danh Mục</h3>
            <p className="text-sm text-muted-foreground">Danh Mục sẽ được lưu trữ tại đây</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={openEnvironmentDialog}>Thêm môi trường</Button>
            <Button onClick={openIngredientDialog}>Thêm nguyên liệu</Button>
          </div>
        </div>
        <Separator />
        <Card>
          <CardHeader>
            <CardTitle>Bảng môi trường</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable data={environments?.data} columns={columnsEnvironment} fieldInputFilter={'environmentName'} />
          </CardContent>
        </Card>
        <Card className="pt-2">
          <CardHeader>
            <CardTitle>Bảng nguyên liệu</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable data={ingredients?.data} columns={columnsIngredients} fieldInputFilter={'ingredientName'} />
          </CardContent>
        </Card>
      </div>
      <DialogIngredientForm open={isOpenIngredientDialog} setOpen={setOpenIngredientDialog} />
      <DialogEnvironmentForm open={isOpenEnvironmentDialog} setOpen={setOpenEnvironmentDialog} />
    </>
  );
};

export default Category;
