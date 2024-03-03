import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';
import { mutate } from 'swr';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { environmentControllerCreateEnvironment, environmentControllerUpdateEnvironment } from '@/api/auth-proxies';

interface DialogEnvironmentFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  row?: any;
}
type IngredientFormValues = z.infer<typeof ingredientFormSchema>;

const ingredientFormSchema = z.object({
  environmentCode: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  environmentName: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  environmentDescription: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  environmentStatus: z.string().max(160).min(4),
  barCode: z.string().max(160).min(4),
  environmentUnit: z.string().max(160).min(1),
  environmentFormula: z.string().max(160).min(1),
});

const DialogEnvironmentForm = ({ open, setOpen, row }: DialogEnvironmentFormProps) => {
  const { toast } = useToast();
  const statusSelect = [
    {
      key: 'active',
      label: 'Active',
    },
    {
      key: 'inactive',
      label: 'Inactive',
    },
  ];
  const unitSelect = [
    {
      key: 'l',
      label: 'lít',
    },
    {
      key: 'kg',
      label: 'kilogram',
    },
  ];
  const formulaSelect = [
    {
      key: '*',
      label: '*',
    },
    {
      key: '-',
      label: '-',
    },
    {
      key: '+',
      label: '+',
    },
    {
      key: '/',
      label: '/',
    },
  ];
  const defaultValues: Partial<IngredientFormValues> = row
    ? row.original
    : {
        environmentCode: '',
        environmentName: '',
        environmentDescription: '',
        status: '',
        barCode: '',
        environmentUnit: '',
      };
  const form = useForm<IngredientFormValues>({
    resolver: zodResolver(ingredientFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = async (data: IngredientFormValues) => {
    const request = row
      ? environmentControllerUpdateEnvironment({ id: row.original.id, environment: data })
      : environmentControllerCreateEnvironment(data);
    const response = await request;

    toast({
      title: 'Tạo môi trương thành công',
    });
    await mutate('api/environment');
    setOpen(false);
    form.reset(defaultValues);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Environment Detailse</DialogTitle>
          <DialogDescription>Enter the details of the environment.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <FormField
                  control={form.control}
                  name="environmentCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Environment Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Environment Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-1.5">
                <FormField
                  control={form.control}
                  name="environmentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Environment Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Environment Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <FormField
                control={form.control}
                name="environmentDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Environment Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Environment Description" className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <FormField
                  control={form.control}
                  name="environmentUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Đơn vị</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn đơn vị" />
                          </SelectTrigger>
                        </FormControl>
                        {unitSelect && (
                          <SelectContent>
                            {unitSelect.length > 0 &&
                              unitSelect.map((option) => (
                                <SelectItem key={option.key} value={option.key}>
                                  {option.label}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        )}
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-1.5">
                <FormField
                  control={form.control}
                  name="environmentFormula"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Đơn vị</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn đơn vị" />
                          </SelectTrigger>
                        </FormControl>
                        {formulaSelect && (
                          <SelectContent>
                            {formulaSelect.length > 0 &&
                              formulaSelect.map((option) => (
                                <SelectItem key={option.key} value={option.key}>
                                  {option.label}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        )}
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-1.5">
                <FormField
                  control={form.control}
                  name="environmentStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trạng thái</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn trạng thái" />
                          </SelectTrigger>
                        </FormControl>
                        {statusSelect && (
                          <SelectContent>
                            {statusSelect.length > 0 &&
                              statusSelect.map((option) => (
                                <SelectItem key={option.key} value={option.key}>
                                  {option.label}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        )}
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-1.5">
                <FormField
                  control={form.control}
                  name="barCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>barCode</FormLabel>
                      <FormControl>
                        <Input placeholder="Bar code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogEnvironmentForm;
