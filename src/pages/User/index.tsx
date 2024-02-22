import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const User = () => {
  return (
    <Tabs defaultValue="info">
      <div className="space-y-6 p-4 pt-4">
        <TabsList>
          <TabsTrigger value="info">Trang cá nhân</TabsTrigger>
          <TabsTrigger value="reset">Đổi mật khẩu</TabsTrigger>
        </TabsList>
        <div className="sticky grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="">
            <Card className="w-full ">
              <CardHeader className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage alt="User's Name" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <CardTitle>User's Name</CardTitle>
                  <CardDescription>User's Job Title</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">user@example.com</p>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone">Phone</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">+1 (123) 456-7890</p>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="bio">Bio</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt, lorem non tincidunt
                    varius, nunc erat scelerisque lorem, non mollis dui orci ac erat.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-2">
            <TabsContent value="info" className="mt-0">
              <Card className="w-full">
                <CardHeader className="flex items-center gap-4">
                  <CardTitle>User Update Form</CardTitle>
                  <CardDescription>Update your personal information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="middle-name">Middle name</Label>
                    <Input id="middle-name" placeholder="Enter your middle name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" placeholder="Enter your last name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" placeholder="Enter your email" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter your phone number" type="tel" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" placeholder="Enter your date of birth" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Enter your address" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profilePicture">Profile Picture</Label>
                    <Input id="profilePicture" type="file" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea className="min-h-[100px]" id="bio" placeholder="Tell us about yourself" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-4">
                  <Button variant="outline">Cancel</Button>
                  <Button>Submit</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="reset" className="mt-0">
              <Card className="w-full">
                <CardHeader className="0">
                  <CardTitle className="text-center text-2xl font-bold">Reset Password</CardTitle>
                  <CardDescription className="text-center">Please enter your email and new password.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="m@example.com" required type="email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" required type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" required type="password" />
                    </div>
                    <Button className="w-full" type="submit">
                      Reset Password
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="text-center">
                  <Link className="underline" to="#">
                    Back to Login
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </div>
      </div>
    </Tabs>
  );
};

export default User;
