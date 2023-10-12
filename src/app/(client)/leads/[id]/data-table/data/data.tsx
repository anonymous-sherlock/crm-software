import { LeadStatus } from "@prisma/client";
import {
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  StopwatchIcon
} from "@radix-ui/react-icons";


export type Status = {
  value: LeadStatus;
  label: string;
  icon?: React.ComponentType<{ className?: string, absoluteStrokeWidth?: boolean, strokeWidth?: string | number }>;
};

export const statuses: Status[] = [
  {
    value: "OnHold",
    label: "On Hold",
    icon: CircleIcon,
  },
  {
    value: "Paid",
    label: "Paid",
    icon: StopwatchIcon,
  },
  {
    value: "Approved",
    label: "Approved",
    icon: CheckCircledIcon,
  },
  {
    value: "Trashed",
    label: "Trashed",
    icon: CrossCircledIcon,
  },
];

