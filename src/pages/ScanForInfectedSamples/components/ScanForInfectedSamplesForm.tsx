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

const ScanForInfectedSamplesSchema = z.object({
  typeOfInfection: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  manufacture: z.string().max(160).min(4),
  barCode: z.string().max(160).optional(),
  note: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
});

type scanForInfectedSamplesFormValues = z.infer<typeof ScanForInfectedSamplesSchema>;

const ScanForInfectedSamplesForm = () => {
  const { toast } = useToast();
  const defaultValues: Partial<scanForInfectedSamplesFormValues> = { barCode: '' };
  const form = useForm<scanForInfectedSamplesFormValues>({
    resolver: zodResolver(ScanForInfectedSamplesSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: scanForInfectedSamplesFormValues) {
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
            <div className="mb-2 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <FormField
                  control={form.control}
                  name="typeOfInfection"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loại nhiễm</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại nhiễm" />
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
                  name="manufacture"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sản xuất</FormLabel>
                      <FormControl>
                        <Input placeholder="Sản xuất" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="mb-8 grid grid-cols-1 gap-4">
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
              <FormField
                control={form.control}
                name="barCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>BarCode</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabledOpacity={false}
                        disabled
                        placeholder="BarCode"
                        className="resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit">Tạo</Button>
      </form>
    </Form>
  );
};

export default ScanForInfectedSamplesForm;
