import { TreeScreeningForm } from '@/pages/TreeScreening/components/TreeScreeningForm';
import { Separator } from '@/components/ui/separator';
import { treescreening } from '@/constants';
import { getData } from '@/helpers/apiHandle';
import useSWR from 'swr';

const TreeScreening = () => {
  const { data, error, isLoading } = useSWR(treescreening, getData);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div className="flex flex-col gap-2 p-4 pt-4">
      <div>
        <h3 className="text-lg font-medium">Soi cây</h3>
        <p className="text-sm text-muted-foreground"></p>
      </div>
      <Separator />
      <TreeScreeningForm />
    </div>
  );
};

export default TreeScreening;
