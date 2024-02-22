import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BrightRoomSchema = z.object({
  typeOfInfection: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  infectionLevel: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  brightRoom: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  status: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  manufacture: z.string().max(160).min(4),
  transplantationLimit: z.date({
    required_error: 'A date of birth is required.',
  }),
  barCode: z.string().max(160).min(4),
  week: z.string().max(160).min(4),
  weekKH: z.string().max(160).min(4),
  varietyCode: z.string().max(160).min(4),
  CChild: z.string().max(160).min(4),
  staff: z.string().max(160).min(4),
  note: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
});

type BrightRoomFormValues = z.infer<typeof BrightRoomSchema>;

const BrightRoomForm = () => {
  const { toast } = useToast();
  const defaultValues: Partial<BrightRoomFormValues> = { barCode: '' };
  const form = useForm<BrightRoomFormValues>({
    resolver: zodResolver(BrightRoomSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: BrightRoomFormValues) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="barCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Barcode</FormLabel>
                  <FormControl>
                    <Input placeholder="BarCode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <FormField
                  control={form.control}
                  name="transplantationLimit"
                  render={({ field }) => (
                    <FormItem className="flex flex-col pt-2.5">
                      <FormLabel>Ngày quét nhiễm</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-[240px] pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground',
                              )}
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
                <FormField
                  control={form.control}
                  name="barCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mã Batch</FormLabel>
                      <FormControl>
                        <Input placeholder="Mã Batch" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="typeOfInfection"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mã Cây</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Mã Cây" />
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
                <FormField
                  control={form.control}
                  name="manufacture"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>T.Con</FormLabel>
                      <FormControl>
                        <Input placeholder="T.Con" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
              <div>
                <FormField
                  control={form.control}
                  name="week"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tuần</FormLabel>
                      <FormControl>
                        <Input placeholder="Tuần" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="varietyCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mã Giống</FormLabel>
                      <FormControl>
                        <Input placeholder="Mã Giống" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="infectionLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nhóm cây</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Nhóm cây" />
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
                <FormField
                  control={form.control}
                  name="CChild"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>C.Con</FormLabel>
                      <FormControl>
                        <Input placeholder="C.Con" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trạng thái</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Trạng thái" />
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
              <div>
                <FormField
                  control={form.control}
                  name="weekKH"
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
                <FormField
                  control={form.control}
                  name="barCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gốc Mẹ</FormLabel>
                      <FormControl>
                        <Input placeholder="Gốc Mẹ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="typeOfInfection"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GĐ</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="GĐ" />
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
                <FormField
                  control={form.control}
                  name="brightRoom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phòng sáng</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Phòng sáng" />
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
                <FormField
                  control={form.control}
                  name="staff"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nhân Viên</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhân Viên" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="infectionLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nhập xuất</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn Nhập Xuất" />
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
                <FormField
                  control={form.control}
                  name="barCode"
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
                <FormField
                  control={form.control}
                  name="infectionLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Độ Nhiễm</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn Độ Nhiễm" />
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
                <FormField
                  control={form.control}
                  name="infectionLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kệ</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn kệ" />
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
          </CardContent>
        </Card>

        <Button type="submit">Tạo</Button>
      </form>
    </Form>
  );
};

export default BrightRoomForm;
