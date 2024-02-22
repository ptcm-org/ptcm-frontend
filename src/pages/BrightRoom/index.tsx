import { Separator } from '@/components/ui/separator';
import BrightRoomForm from './components/BrightRoomForm';

const BrightRoom = () => {
  return (
    <div className="flex flex-col gap-2 space-y-6 p-4 pt-4">
      <div>
        <h3 className="text-lg font-medium">Nhập Phòng Sáng</h3>
        <p className="text-sm text-muted-foreground">Nhập Phòng Sáng sẽ được lưu trữ tại đây</p>
      </div>
      <Separator />
      <BrightRoomForm />
    </div>
  );
};

export default BrightRoom;
