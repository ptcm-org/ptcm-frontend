import { Dispatch, SetStateAction } from 'react';
import { z } from 'zod';

export interface DialogFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  row?: any;
}

export type FormValues<T extends z.ZodType<any, any, any>> = z.infer<T>;
