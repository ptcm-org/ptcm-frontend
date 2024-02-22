import { AlertCircle, Archive, ArchiveX, File, LampCeiling, LucideIcon, PenBox, Send, Users } from 'lucide-react';
import { ROUTES } from '.';

type Link = {
  title: string;
  href: string;
  label?: string;
  icon: LucideIcon;
  variant: 'default' | 'ghost';
};

export const sidebarNavItems: Link[] = [
  {
    title: 'Soi Cây',
    href: ROUTES.TREE_SCREENING,
    label: '',
    icon: PenBox,
    variant: 'ghost',
  },
  {
    title: 'Phát Mô',
    href: ROUTES.TISSUE_DEVELOPMENT,
    label: '',
    icon: AlertCircle,
    variant: 'ghost',
  },
  {
    title: 'Nhật Kí Cấy',
    href: ROUTES.ROOT,
    label: '',
    icon: Archive,
    variant: 'ghost',
  },
  {
    title: 'Nhập Mẫu Nhiễm',
    href: ROUTES.ENTER_INFECTED_SAMPLE_INFORMATION,
    label: '',
    icon: ArchiveX,
    variant: 'ghost',
  },
  {
    title: 'Quét Mẫu Nhiễm',
    href: ROUTES.SCAN_FOR_INFECTED_SAMPLES,
    label: '',
    icon: File,
    variant: 'ghost',
  },
  {
    title: 'Môi Trường',
    href: ROUTES.ENVIRONMENT,
    label: '',
    icon: Send,
    variant: 'ghost',
  },
  {
    title: 'Phòng sáng',
    href: ROUTES.BRIGHT_ROOM,
    label: '',
    icon: LampCeiling,
    variant: 'ghost',
  },
  {
    title: 'Quản lý người dung',
    href: ROUTES.USER_MANAGEMENT,
    label: '',
    icon: Users,
    variant: 'ghost',
  },
];
