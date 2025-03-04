import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface MockCalendarProps {
  candidateName: string;
}

export default function MockCalendar({ candidateName }: MockCalendarProps) {
  const { toast } = useToast();
  
  const timeSlots = [
    "March 5, 10:00 AM",
    "March 5, 2:00 PM",
    "March 6, 11:00 AM",
    "March 6, 3:00 PM"
  ];

  const handleTimeSelect = (time: string) => {
    toast({
      title: "Meeting Scheduled",
      description: `Meeting with ${candidateName} scheduled for ${time}`
    });
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>
      <div className="grid gap-2">
        {timeSlots.map((time, i) => (
          <Button
            key={i}
            variant="outline"
            className="w-full justify-start"
            onClick={() => handleTimeSelect(time)}
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  );
}
