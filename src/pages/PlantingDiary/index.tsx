import { PlantingDiaryForm } from '@/pages/PlantingDiary/components/PlantingDiaryForm';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TissueGrowthForm from './components/TissueGrowthForm';

const Home = () => {
  return (
    <>
      <div className="p-4 pt-4">
        <Tabs defaultValue="tissueImplant">
          <div className="flex flex-wrap items-center justify-between gap-2 space-y-6">
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Nhật ký cấy</h3>
              <p className="text-sm text-muted-foreground">Nhật ký cấy sẽ được lưu trữ tại đây</p>
            </div>
            <TabsList>
              <TabsTrigger value="tissueImplant">Mô Cấy</TabsTrigger>
              <TabsTrigger value="tissueGrowth">Mô Phát</TabsTrigger>
            </TabsList>
          </div>

          <Separator />
          <TabsContent value="tissueImplant">
            <div className="flex flex-col gap-2 space-y-6 p-4 pt-4">
              <PlantingDiaryForm />
            </div>
          </TabsContent>
          <TabsContent value="tissueGrowth">
            <div className="flex flex-col gap-2 space-y-6 p-4 pt-4">
              <TissueGrowthForm />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Home;
