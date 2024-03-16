import { useToast } from '@/components/ui/use-toast';
import { DialogFormProps, FormValues } from '@/interfaces/Form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useSWR, { useSWRConfig } from 'swr';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

import {
  cellCultureMediumControllerCreateCellCultureMedium,
  cellCultureMediumControllerUpdateCellCultureMedium,
} from '@/api/auth-proxies';
import { getData } from '@/api/axios';

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
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { convertArrayToObjectArray, generateFullName } from '@/helpers/convert';

import { Response } from '@/interfaces/Response';
import { Employee } from '@/interfaces/Employee';

type DialogPhaseEnvironmentFormValues = FormValues<typeof phaseEnvironmentFormSchema>;
type BioemployeesResponse = Response<Employee>;
const phaseEnvironmentFormSchema = z.object({
  environmentalCode: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  mixingMediumDate: z.date({
    required_error: 'bạn chưa chọn ngày',
  }),
  environmentalLabel: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  environmentCode: z.string().max(160).min(4),
  employeeId: z.string().max(160).min(4),
  environmentUnit: z.string().max(160).min(2),
  environmentalVolume: z.coerce.number(),
  environmentalTime: z.coerce.number(),
  potCode: z.string().max(160).min(2),
  batchOfPotCode: z.string().max(160).min(2),
  stirrerCode: z.string().max(160).min(2),
  stirringBatchCode: z.string().max(160).min(2),
  note: z.string().max(160).min(2),
});
const DialogPhaseEnvironmentForm = ({ open, setOpen, row }: DialogFormProps) => {
  const { toast } = useToast();
  const { mutate } = useSWRConfig();
  const { data: bioemployees, isLoading, error } = useSWR<BioemployeesResponse>('/api/bioemployee', getData);
  const bioSelect = convertArrayToObjectArray(bioemployees?.data, 'employeeId', undefined, generateFullName);
  const defaultValues: Partial<DialogPhaseEnvironmentFormValues> = row ? row.original : {};
  const form = useForm<DialogPhaseEnvironmentFormValues>({
    resolver: zodResolver(phaseEnvironmentFormSchema),
    defaultValues,
    mode: 'onChange',
  });
  const onSubmit = async (data: DialogPhaseEnvironmentFormValues) => {
    const request = row
      ? cellCultureMediumControllerUpdateCellCultureMedium({ id: row.original.id, cellCultureMedium: data })
      : cellCultureMediumControllerCreateCellCultureMedium(data);
    const response = await request;

    if (response.statusCode === 201 || response.statusCode === 200) {
      toast({
        title: 'Tạo nguyên liệu thành công',
      });
      await mutate('/api/cellculturemedium');
      setOpen(false);
      form.reset(defaultValues);
    }
  };

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
  const mockSelect = [
    {
      key: 'key1',
      label: 'option1',
    },
    {
      key: 'key2',
      label: 'option2',
    },
    {
      key: 'key3',
      label: 'option3',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Ingredient Details</DialogTitle>
          <DialogDescription>Enter the details of the ingredient.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="environmentalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mã phiếu</FormLabel>
                      <FormControl>
                        <Input placeholder="Mã phiếu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="mixingMediumDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col pt-2.5">
                      <FormLabel>Ngày</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                            >
                              {field.value ? format(field.value, 'PPP') : <span>Ngày quét nhiễm</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="environmentalLabel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nhãn MT</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhãn MT" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="environmentCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mã MT</FormLabel>
                      <FormControl>
                        <Input placeholder="Mã MT" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="employeeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NV Pha</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn Nhân viên" />
                          </SelectTrigger>
                        </FormControl>
                        {bioSelect && (
                          <SelectContent>
                            {bioSelect.length > 0 &&
                              bioSelect.map((option) => (
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
              <div className="space-y-2">
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
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="environmentalVolume"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dung tích</FormLabel>
                      <FormControl>
                        <Input placeholder="0.0" {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="environmentalTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TGian (Phút)</FormLabel>
                      <FormControl>
                        <Input placeholder="phút" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="potCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nồi</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn nôi" />
                          </SelectTrigger>
                        </FormControl>
                        {mockSelect && (
                          <SelectContent>
                            {mockSelect.length > 0 &&
                              mockSelect.map((option) => (
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
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="batchOfPotCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mẻ nồi</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn mẻ nồi" />
                          </SelectTrigger>
                        </FormControl>
                        {mockSelect && (
                          <SelectContent>
                            {mockSelect.length > 0 &&
                              mockSelect.map((option) => (
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
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="stirrerCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Máy khuấy</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn máy khuấy" />
                          </SelectTrigger>
                        </FormControl>
                        {mockSelect && (
                          <SelectContent>
                            {mockSelect.length > 0 &&
                              mockSelect.map((option) => (
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
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="stirringBatchCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mẻ khuấy</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn mẻ khuấy" />
                          </SelectTrigger>
                        </FormControl>
                        {mockSelect && (
                          <SelectContent>
                            {mockSelect.length > 0 &&
                              mockSelect.map((option) => (
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
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ghi chú</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ghi chú" className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="pt-2">
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPhaseEnvironmentForm;
