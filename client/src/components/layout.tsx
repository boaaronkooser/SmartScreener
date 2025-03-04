import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, User, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const mockJobs = [
    { id: 1, title: "Plumber" },
    { id: 2, title: "Electrician" },
    { id: 3, title: "Carpenter" }
  ];

  const mockAppointments = [
    { date: "March 5, 2025", time: "10:00 AM", candidate: "John Doe" },
    { date: "March 6, 2025", time: "2:00 PM", candidate: "Jane Smith" }
  ];

  const blockedTimes = [
    { date: "March 5, 2025", time: "3:00 PM - 5:00 PM", reason: "Team Meeting" },
    { date: "March 7, 2025", time: "All Day", reason: "Out of Office" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="h-16 px-6 flex items-center justify-between z-10" style={{ backgroundColor: '#3959ff' }}>
        <div className="flex items-center">
          <img src="/e44f0e34-94d3-4383-8c6b-4c83633dfb10-hirebus-new-logo-2.png" alt="HireBus" className="h-8" />
        </div>
        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Calendar className="h-5 w-5" style={{ color: '#fffa20' }} />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
              <DialogHeader>
                <DialogTitle>Calendar & Appointments</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Upcoming Appointments</h3>
                  <div className="space-y-2">
                    {mockAppointments.map((apt, i) => (
                      <Card key={i} className="p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{apt.candidate}</p>
                            <p className="text-sm text-muted-foreground">{apt.date} at {apt.time}</p>
                          </div>
                          <Button variant="outline" size="sm">Reschedule</Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Blocked Times</h3>
                  <div className="space-y-2">
                    {blockedTimes.map((block, i) => (
                      <Card key={i} className="p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{block.reason}</p>
                            <p className="text-sm text-muted-foreground">{block.date}, {block.time}</p>
                          </div>
                          <Button variant="outline" size="sm">Remove</Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <Button className="w-full">
                  Block New Time Slot
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="ghost" size="icon">
            <Avatar>
              <AvatarFallback>
                <User className="h-5 w-5" style={{ color: '#fffa20' }} />
              </AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={cn(
          "bg-sidebar border-r border-border transition-all duration-300",
          sidebarCollapsed ? "w-16" : "w-64"
        )}>
          <div className="p-4 flex flex-col h-full">
            <Button
              variant="ghost"
              size="sm"
              className="self-end mb-4"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>

            <nav className="space-y-2">
              {mockJobs.map(job => (
                <Button
                  key={job.id}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  {!sidebarCollapsed && job.title}
                </Button>
              ))}
              <Button
                variant="outline"
                className="w-full justify-start mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                {!sidebarCollapsed && "New Job Opening"}
              </Button>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}