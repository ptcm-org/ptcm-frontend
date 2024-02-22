import TissueDevelopmentForm from '@/pages/TissueDevelopment/components/TissueDevelopmentForm';
import { Separator } from '@/components/ui/separator';

const TissueDevelopment = () => {
  return (
    <div className="flex flex-col gap-2 space-y-6 p-4 pt-4">
      <div>
        <h3 className="text-lg font-medium">Phát Mô</h3>
        <p className="text-sm text-muted-foreground"></p>
      </div>
      <Separator />
      <TissueDevelopmentForm />
    </div>
  );
};

export default TissueDevelopment;
