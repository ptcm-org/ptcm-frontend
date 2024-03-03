import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';
import { mutate } from 'swr';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  environmentControllerCreateEnvironmentIngredient,
  environmentControllerUpdateEnvironmentIngredient,
} from '@/api/auth-proxies';
import { useToast } from '@/components/ui/use-toast';

type IngredientFormValues = z.infer<typeof ingredientFormSchema>;

interface DialogIngredientFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  row?: any;
}

const ingredientFormSchema = z.object({
  ingredientCode: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  ingredientName: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  ingredientDescription: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  status: z.string().max(160).min(4),
  barCode: z.string().max(160).min(4),
  ingredientUnit: z.string().max(160).min(2),
});

const DialogIngredientForm = ({ open, setOpen, row }: DialogIngredientFormProps) => {
  const { toast } = useToast();

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
  const defaultValues: Partial<IngredientFormValues> = row
    ? row.original
    : {
        ingredientCode: '',
        ingredientName: '',
        ingredientDescription: '',
        status: '',
        barCode: '',
        ingredientUnit: '',
      };
  const form = useForm<IngredientFormValues>({
    resolver: zodResolver(ingredientFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = async (data: IngredientFormValues) => {
    const request = row
      ? environmentControllerUpdateEnvironmentIngredient({ id: row.original.id, environmentIngredient: data })
      : environmentControllerCreateEnvironmentIngredient(data);
    const response = await request;

    if (response.statusCode === 201 || response.statusCode === 200) {
      toast({
        title: 'Tạo nguyên liệu thành công',
      });
      await mutate('api/environment/ingredients');
      setOpen(false);
      form.reset(defaultValues);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ingredient Details</DialogTitle>
          <DialogDescription>Enter the details of the ingredient.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <FormField
                  control={form.control}
                  name="ingredientCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ingredient Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingredient Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-1.5">
                <FormField
                  control={form.control}
                  name="ingredientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ingredient Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingredient Name" {...field} />
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
                name="ingredientDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ingredient Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ingredient Description" className="resize-none" {...field} />
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
                  name="ingredientUnit"
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
                  name="status"
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

export default DialogIngredientForm;
