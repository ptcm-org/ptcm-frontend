import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Components
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const profileFormSchema = z.object({
  barCode: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  batchCode: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  seedCode: z.string().max(160).min(4),
  motherOrigin: z.string().max(160).min(4),
  weekKh: z.string().max(160).min(4),
  staff: z.string().max(160).min(4),
  CChild: z.string().max(160).min(4),
  treeCode: z.string().max(160).min(1),
  cMon: z.string().max(160).min(1),
  treeGroup: z.string().max(160).min(1),
  nvGroup: z.string().max(160).min(1),
  note: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  date: z.date({
    required_error: 'A date of birth is required.',
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const TissueDevelopmentForm = () => {
  // This can come from your database or API.
  const defaultValues: Partial<ProfileFormValues> = {};

  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: ProfileFormValues) {
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
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <FormField
                  control={form.control}
                  name="barCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>BarCode</FormLabel>
                      <FormControl>
                        <Input placeholder="BarCode" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="motherOrigin"
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
                  name="staff"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nhân viên</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhân viên" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cMon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>C.Mẹ</FormLabel>
                      <FormControl>
                        <Input placeholder="C.Mẹ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="batchCode"
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
                  name="weekKh"
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
                  name="treeGroup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nhóm Cây</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn Nhóm Cây" />
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
                  name="seedCode"
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
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col pt-2.5">
                      <FormLabel>Ngày</FormLabel>
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
                              {field.value ? format(field.value, 'PPP') : <span>Ngày</span>}
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
                  name="treeCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mã cây</FormLabel>
                      <FormControl>
                        <Input placeholder="Mã cây" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nvGroup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nhóm NV</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn Nhóm NV" />
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
          </CardContent>
        </Card>

        <Button type="submit">Tạo</Button>
      </form>
    </Form>
  );
};

export default TissueDevelopmentForm;
