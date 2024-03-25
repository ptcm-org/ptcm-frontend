import { useToast } from '@/components/ui/use-toast';
import { DialogFormProps, FormValues } from '@/interfaces/Form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSWRConfig } from 'swr';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';

import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { customerControllerCreateCustomer, customerControllerUpdateCustomer } from '@/api/auth-proxies';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CheckIcon } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CaretSortIcon } from '@radix-ui/react-icons';

const CustomerSchema = z.object({
  customerName: z.string().min(2).max(100).optional(),
  customerAddress1: z.string().min(2).max(100).optional(),
  customerAddress2: z.string().max(100).optional(),
  country: z.string().min(2).max(50).optional(),
  province: z.string().min(2).max(50).optional(),
  city: z.string().min(2).max(50).optional(),
  postalCode: z.string().max(20).optional(),
  emailAddress: z.string().email().optional(),
  emailAddressCustomer: z.string().email().optional(),
  phone: z.string().optional(),
  businessType: z.string().min(2).max(50).optional(),
  status: z.enum(['active', 'inactive', 'pending']).optional(),
  website: z.string().url().optional().optional(),
  firstName: z.string().min(2).max(100).optional(),
  lastName: z.string().min(2).max(100).optional(),
  middleName: z.string().min(2).max(100).optional(),
  skype: z.string().min(2).max(100).optional(),
  fax: z.string().min(2).max(100).optional(),
  areaCode: z.string().min(2).max(100).optional(),
});
type CustomerFormValues = FormValues<typeof CustomerSchema>;

const DialogCustomerForm = ({ open, setOpen, row }: DialogFormProps) => {
  const { toast } = useToast();
  const { mutate } = useSWRConfig();
  let defaultValues: Partial<CustomerFormValues>;

  if (row) {
    const { contactInfo, phoneNumber } = row.original;

    defaultValues = {
      ...row.original,
      areaCode: phoneNumber?.areaCode,
      phone: phoneNumber?.phone,
      firstName: contactInfo?.firstName,
      lastName: contactInfo?.lastName,
      middleName: contactInfo?.middleName,
      skype: contactInfo?.skype,
      emailAddressCustomer: contactInfo?.emailAddress,
    };
  } else {
    defaultValues = {};
  }
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(CustomerSchema),
    defaultValues,
    mode: 'onChange',
  });
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

  const onSubmit = async (data: CustomerFormValues) => {
    const {
      customerName,
      customerAddress1,
      customerAddress2,
      country,
      province,
      city,
      postalCode,
      emailAddress,
      emailAddressCustomer,
      phone,
      businessType,
      website,
      firstName,
      lastName,
      middleName,
      skype,
      status,
      areaCode,
    } = data;
    const formattedPhoneNumber = {
      phone: phone,
      areaCode: getCountryCallingCode(areaCode.toUpperCase()),
    };
    const contactInfo = {
      firstName,
      lastName,
      middleName,
      skype,
      emailAddress: emailAddressCustomer,
    };

    const payload = {
      customerName,
      customerAddress1,
      customerAddress2,
      country,
      province,
      city,
      postalCode,
      emailAddress,
      phoneNumber: formattedPhoneNumber,
      businessType,
      status,
      website,
      contactInfo,
    };
    console.log(payload);
    const request = row
      ? customerControllerUpdateCustomer({ id: row.original.id, customer: payload })
      : customerControllerCreateCustomer(payload);
    const response = await request;

    if (response.statusCode === 201 || response.statusCode === 200) {
      toast({
        title: 'Tạo khách hàng thành công',
      });
      await mutate('api/customer');
      setOpen(false);
      form.reset(defaultValues);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Khách hàng</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên khách hàng</FormLabel>
                      <FormControl>
                        <Input placeholder="Tên khách hàng" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="customerAddress1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Địa chỉ khách hàng 1</FormLabel>
                      <FormControl>
                        <Input placeholder="Địa chỉ khách hàng 1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="customerAddress2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Địa chỉ khách hàng 2</FormLabel>
                      <FormControl>
                        <Input placeholder="Địa chỉ khách hàng 2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="fax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Địa chỉ Fax</FormLabel>
                      <FormControl>
                        <Input placeholder="Địa chỉ fax" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className=" grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quốc gia</FormLabel>
                      <FormControl>
                        <Input placeholder="Quốc gia" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tỉnh</FormLabel>
                      <FormControl>
                        <Input placeholder="Tỉnh" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thành phố</FormLabel>
                      <FormControl>
                        <Input placeholder="Thành phố" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mã bưu điện</FormLabel>
                      <FormControl>
                        <Input placeholder="Mã bưu điện" {...field} />
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
                  name="emailAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Địa chỉ email</FormLabel>
                      <FormControl>
                        <Input placeholder="Địa chỉ email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loại doanh nghiệp</FormLabel>
                      <FormControl>
                        <Input placeholder="Loại doanh nghiệp" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>website</FormLabel>
                      <FormControl>
                        <Input placeholder="địa chỉ website" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
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
            </div>
            <Separator className="my-4" />
            <h2 className="py-2">thông tin người liên hệ</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên</FormLabel>
                      <FormControl>
                        <Input placeholder="Tên" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ</FormLabel>
                      <FormControl>
                        <Input placeholder="Họ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên đệm</FormLabel>
                      <FormControl>
                        <Input placeholder="Tên đệm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="emailAddressCustomer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email người liên hệ</FormLabel>
                      <FormControl>
                        <Input placeholder="Email người liên hệ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="skype"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skype người liên hệ</FormLabel>
                      <FormControl>
                        <Input placeholder="Skype người liên hệ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" space-y-2">
                <FormField
                  control={form.control}
                  name="areaCode"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-3">
                      <FormLabel>Mã vùng</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}
                            >
                              {field.value
                                ? getCountries().find((country) => country === field.value)
                                : 'Select country'}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search framework..." className="h-9" />
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <ScrollArea className="h-[200px]">
                              <CommandGroup>
                                {getCountries().map((country) => (
                                  <CommandItem
                                    value={country}
                                    key={country}
                                    onSelect={() => {
                                      form.setValue('country', country);
                                    }}
                                  >
                                    {country}
                                    <CheckIcon
                                      className={cn(
                                        'ml-auto h-4 w-4',
                                        country === field.value ? 'opacity-100' : 'opacity-0',
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </ScrollArea>
                          </Command>
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số điện thoại người liên hệ</FormLabel>
                      <FormControl>
                        <Input placeholder="sđt" {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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

export default DialogCustomerForm;
