import { Dispatch, SetStateAction } from 'react';
import { useSWRConfig } from 'swr';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';

import {
  changingCultureMediumControllerCreateChangingCultureMedium,
  changingCultureMediumControllerUpdateChangingCultureMedium,
} from '@/api/auth-proxies';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

interface DialogEnvironmentFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  row?: any;
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

const environmentSchema = z.object({
  changingCultureDate: z.date({
    required_error: 'Ngày đo môi trường là mắc định',
  }),
  environmentalCode: z.string(),
  cellCultureCode: z.string(),
  boxId: z.string(),
  transactionType: z.string(),
  employeeId: z.string(),
  // environmentalVolume: z.number(),
  environmentalVolume: z.string(),
  childBags: z.string(),
  // childBags: z.number(),
  bagCode: z.string(),
  // changingCultureMediumTime: z.number(),
  changingCultureMediumTime: z.string(),
  environmentRoomCode: z.string(),
  environmentShelveCode: z.string(),
  changingCultureMediumCode: z.string(),
  customerWeek: z.string(),
  bagBox: z.string(),
  note: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
});
type EnvironmentFormValues = z.infer<typeof environmentSchema>;

export function DialogEnvironmentForm({ open, setOpen, row, bioSelect, shelvesSelect }: DialogEnvironmentFormProps) {
  const { toast } = useToast();
  const { mutate } = useSWRConfig();
  const defaultValues: Partial<EnvironmentFormValues> = row ? row.original : {};

  const form = useForm<EnvironmentFormValues>({
    resolver: zodResolver(environmentSchema),
    defaultValues,
    mode: 'onChange',
  });

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

  const onSubmit = async (data: EnvironmentFormValues) => {
    const request = row
      ? changingCultureMediumControllerUpdateChangingCultureMedium({ id: row.original.id, changingCultureMedium: data })
      : changingCultureMediumControllerCreateChangingCultureMedium(data);
    const response = await request;

    if (response.statusCode === 201 || response.statusCode === 200) {
      toast({
        title: 'Tạo nguyên liệu thành công',
      });
      await mutate('/api/changingculturemedium');
      setOpen(false);
      form.reset(defaultValues);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Môi trường</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <div className="space-y-2">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="changingCultureDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col pt-2.5">
                        <FormLabel>Ngày quét nhiễm</FormLabel>
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
                    name="environmentalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Môi trường</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Môi trường" />
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
                    name="cellCultureCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nhãn pha</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Nhãn pha" />
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
                    name="boxId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chọn box</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn Box" />
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
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="transactionType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nhập xuất</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn Box" />
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
                    name="employeeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NV đổ</FormLabel>
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
                    name="environmentalVolume"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dung tích</FormLabel>
                        <FormControl>
                          <Input placeholder="Dung tích" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="childBags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Túi con</FormLabel>
                        <FormControl>
                          <Input placeholder="Túi con" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="bagCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mã Túi</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn túi" />
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
                    name="changingCultureMediumTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thời gian (phút)</FormLabel>
                        <FormControl>
                          <Input placeholder="Thời gian (phút)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="environmentRoomCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phòng MT </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn phòng môi trường" />
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
                    name="environmentShelveCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kệ MT</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn kệ môi trường" />
                            </SelectTrigger>
                          </FormControl>
                          {shelvesSelect && (
                            <SelectContent>
                              {shelvesSelect.length > 0 &&
                                shelvesSelect.map((option) => (
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
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="changingCultureMediumCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mã phiếu</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn mã phiếu môi trường" />
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
                    name="customerWeek"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tuần KH</FormLabel>
                        <FormControl>
                          <Input placeholder="Tuần KH" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="bagBox"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thùng túi</FormLabel>
                        <FormControl>
                          <Input placeholder="Thùng túi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="">
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
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
