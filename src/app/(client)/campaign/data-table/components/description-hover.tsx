import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Info } from "lucide-react";

interface DescriptionHoverProps {
  description: string;
}
function DescriptionHover({ description }: DescriptionHoverProps) {
  return (
    <HoverCard closeDelay={200} openDelay={300}>
      <HoverCardTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full p-1 h-6 w-6"
        >
          <Info size={14} />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="max-w-80">
        <p className="">{description}</p>
      </HoverCardContent>
    </HoverCard>
  );
}

export default DescriptionHover;
