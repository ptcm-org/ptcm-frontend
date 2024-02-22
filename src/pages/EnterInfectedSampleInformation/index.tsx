import { Separator } from '@/components/ui/separator';
import InfectedSampleInformationForm from './components/InfectedSampleInformationForm';

const EnterInfectedSampleInformation = () => {
  return (
    <div className="flex flex-col gap-2 space-y-6 p-4 pt-4">
      <div>
        <h3 className="text-lg font-medium">Nhập Mẫu Nhiễm</h3>
        <p className="text-sm text-muted-foreground">Nhập Mẫu Nhiễm sẽ được lưu trữ tại đây</p>
      </div>
      <Separator />
      <InfectedSampleInformationForm />
    </div>
  );
};

export default EnterInfectedSampleInformation;
