import { COLORS } from '@/shared/config/colors';

export const TASK_STATUS_COLORS = {
  inProgress: COLORS.blue,
  pending: COLORS.gray,
  completed: COLORS.green,
} as const;