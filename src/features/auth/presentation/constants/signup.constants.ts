import { CardOption } from '@/shared/components/form-components/CardSelector';
import { PM_IMAGE, MANAGER_IMAGE, SALESPERSON_IMAGE, DEVELOPER_IMAGE, DESIGNER_IMAGE, WRITER_IMAGE, MARKETING_IMAGE } from '@/assets/auth/index';

export const SIGNUP_ROLE_OPTIONS: CardOption[] = [
  { value: 'designer', title: 'Diseñador', imageSrc: DESIGNER_IMAGE },
  { value: 'writer', title: 'Contenido', imageSrc: WRITER_IMAGE },
  { value: 'seo', title: 'SEO', imageSrc: MARKETING_IMAGE },
  { value: 'marketing', title: 'Marketing digital', imageSrc: MARKETING_IMAGE },
  { value: 'developer', title: 'Desarrollo Técnico', imageSrc: DEVELOPER_IMAGE },
  { value: 'sales', title: 'Implementador', imageSrc: SALESPERSON_IMAGE },
  { value: 'manager', title: 'Gerente', imageSrc: MANAGER_IMAGE },
  { value: 'pm', title: 'Product Manager', imageSrc: PM_IMAGE },
];
