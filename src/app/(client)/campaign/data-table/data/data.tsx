import { CampaignStatus } from "@prisma/client";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export type Status = {
  value: CampaignStatus;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export const statuses: Status[] = [
  {
    value: "OnHold",
    label: "On Hold",
    icon: CircleIcon,
  },
  {
    value: "InProgress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "Done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "Canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
];

