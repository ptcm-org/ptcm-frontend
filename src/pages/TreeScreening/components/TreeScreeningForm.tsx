import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

// Components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Services
import { apiService } from '@/services/ApiService';

const profileFormSchema = z.object({
  barCode: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  batchCode: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  transplantationLimit: z.date({
    required_error: 'A date of birth is required.',
  }),
  SubculturingDay: z.date({
    required_error: 'A date of birth is required.',
  }),
  breedCode: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  motherRoot: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  treeCode: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  MTCode: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  batchChildCode: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  KHWeek: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  gd: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  transplantGroup: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  seedlings: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  numberOfPockets: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  cleanQuantity: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  cleanInoculation: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  MT_0: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  quantityNLightCleanInoculation: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  implantNMild: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  MT_2: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  quantityNHeavy: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  implantNSevere: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  MT_3: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  note: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  numberOfExcessBags: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  numberOfCancellationBags: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {};

export function TreeScreeningForm() {
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });
  async function onSubmit(data: ProfileFormValues) {
    try {
      await apiService.post('treescreening', data);
      toast({
        title: 'You submitted the following values:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    } catch (error) {}
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
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <FormField
                  control={form.control}
                  name="barCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Barcode</FormLabel>
                      <FormControl>
                        <Input placeholder="Barcode" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="transplantationLimit"
                  render={({ field }) => (
                    <FormItem className="flex flex-col pt-4">
                      <FormLabel>Hạn Cấy</FormLabel>
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
                              {field.value ? format(field.value, 'PPP') : <span>Hạn Cấy</span>}
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
                  name="breedCode"
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
                  name="motherRoot"
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
              </div>
              <div className="">
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
                  name="SubculturingDay"
                  render={({ field }) => (
                    <FormItem className="flex flex-col pt-4">
                      <FormLabel>Ngày Soi</FormLabel>
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
                              {field.value ? format(field.value, 'PPP') : <span>Ngày soi</span>}
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
                      <FormLabel>Mã Cây</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn Mã Cây" />
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
                  name="MTCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mã MT</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn Mã MT" />
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
        <Separator />
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <FormField
                  control={form.control}
                  name="batchChildCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mã Batch Con</FormLabel>
                      <FormControl>
                        <Input placeholder="Mã Batch Con" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="seedlings"
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
                  name="cleanQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SL Sạch</FormLabel>
                      <FormControl>
                        <Input placeholder="SL Sạch" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantityNLightCleanInoculation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SL N Nhẹ</FormLabel>
                      <FormControl>
                        <Input placeholder="SL N Nhẹ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantityNHeavy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SL N Nặng</FormLabel>
                      <FormControl>
                        <Input placeholder="SL N Nặng" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="KHWeek"
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
                  name="numberOfPockets"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SL Túi Soi</FormLabel>
                      <FormControl>
                        <Input placeholder="SL Túi Soi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cleanInoculation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cấy Sạch</FormLabel>
                      <FormControl>
                        <Input placeholder="Cấy Sạch" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="implantNMild"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cấy N Nhẹ</FormLabel>
                      <FormControl>
                        <Input placeholder="Cấy N Nhẹ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="implantNSevere"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cấy N Nặng</FormLabel>
                      <FormControl>
                        <Input placeholder="Cấy N Nặng" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="gd"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GĐ</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn GĐ" />
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
                  name="numberOfCancellationBags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SL Túi Hủy</FormLabel>
                      <FormControl>
                        <Input placeholder="SL Túi Hủy" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="MT_0"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MT_0</FormLabel>
                      <FormControl>
                        <Input placeholder="MT_0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="MT_2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MT_2</FormLabel>
                      <FormControl>
                        <Input placeholder="MT_2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="MT_3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MT_3</FormLabel>
                      <FormControl>
                        <Input placeholder="MT_3" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="transplantGroup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nhóm Cấy</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn Nhóm Cấy" />
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
                  name="numberOfExcessBags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SL Túi Dư</FormLabel>
                      <FormControl>
                        <Input placeholder="SL Túi Dư" {...field} />
                      </FormControl>
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
}
