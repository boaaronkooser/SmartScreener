import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { type Candidate } from "@shared/schema";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface CandidateCardProps {
  candidate: Candidate;
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  const { toast } = useToast();
  const [message, setMessage] = useState("Hi, tell me about your experience");
  const [chatOpen, setChatOpen] = useState(false);
  const [assignmentOpen, setAssignmentOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleSendMessage = () => {
    toast({
      title: "Message sent",
      description: `Your message has been sent to ${candidate.name}. They will respond when available.`
    });
    setChatOpen(false);
  };

  const handleAssignment = () => {
    toast({
      title: "Assignment sent",
      description: `The standard assessment has been sent to ${candidate.name}. You will be notified when they complete it.`
    });
    setAssignmentOpen(false);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{candidate.name}</h3>
          <p className="text-sm text-muted-foreground">{candidate.position}</p>
        </div>
        <Badge variant={candidate.score >= 80 ? "default" : "secondary"}>
          Score: {candidate.score}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {candidate.strengths.map((strength, i) => (
              <Badge key={i} variant="outline">{strength}</Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Dialog open={chatOpen} onOpenChange={setChatOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send Message to {candidate.name}</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                <DialogFooter>
                  <Button onClick={handleSendMessage}>Send Message</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={assignmentOpen} onOpenChange={setAssignmentOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Send className="w-4 h-4 mr-2" />
                  Send Assignment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send Assignment to {candidate.name}</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                  <p className="text-muted-foreground">
                    The standard assessment for {candidate.position} will be sent to {candidate.name}.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Technical knowledge assessment</li>
                    <li>Problem-solving scenarios</li>
                    <li>Safety protocols understanding</li>
                  </ul>
                </div>
                <DialogFooter>
                  <Button onClick={handleAssignment}>Send Assignment</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Meeting
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule Meeting with {candidate.name}</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-muted-foreground">
                    {candidate.name} will receive an invitation to book a meeting time.
                    You can block out unavailable times in your calendar settings.
                  </p>
                </div>
                <DialogFooter>
                  <Button onClick={() => {
                    toast({
                      title: "Booking invitation sent",
                      description: `${candidate.name} will receive an invitation to book a time that suits them.`
                    });
                    setBookingOpen(false);
                  }}>
                    Send Invitation
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}