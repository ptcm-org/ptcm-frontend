import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const profileFormSchema = z.object({
  box: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  treeBase: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  MTCode: z.string().max(160).min(4),
  TMom: z.string().max(160).min(4),
  CMom: z.string().max(160).min(4),
  TChild: z.string().max(160).min(4),
  CChild: z.string().max(160).min(4),
  hour: z.string().max(160).min(1),
  minute: z.string().max(160).min(1),
  note: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {};

export function PlantingDiaryForm() {
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
                  name="box"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Box</FormLabel>
                      <FormControl>
                        <Input placeholder="Box" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="TMom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>T.Mẹ</FormLabel>
                      <FormControl>
                        <Input placeholder="T.Mẹ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="TChild"
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
                  name="hour"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giờ</FormLabel>
                      <FormControl>
                        <Input placeholder="Giờ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="treeBase"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Đế cây</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn đế cây" />
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
                  name="CMom"
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
                  name="minute"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phút</FormLabel>
                      <FormControl>
                        <Input placeholder="Phút" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="MTCode"
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
            </div>
          </CardContent>
        </Card>

        <Button type="submit">Tạo</Button>
      </form>
    </Form>
  );
}
