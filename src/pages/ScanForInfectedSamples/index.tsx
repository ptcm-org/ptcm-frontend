import { Separator } from '@/components/ui/separator';
import ScanForInfectedSamplesForm from './components/ScanForInfectedSamplesForm';

const ScanForInfectedSamples = () => {
  return (
    <div className="flex flex-col gap-2 space-y-6 p-4 pt-4">
      <div>
        <h3 className="text-lg font-medium">Quét mẫu nhiễm</h3>
        <p className="text-sm text-muted-foreground">Quét mẫu nhiễm sẽ được lưu trữ tại đây</p>
      </div>
      <Separator />
      <ScanForInfectedSamplesForm />
    </div>
  );
};

export default ScanForInfectedSamples;
