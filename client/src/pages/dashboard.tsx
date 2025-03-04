import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreVertical, Settings, MessageSquare, Send, Calendar, X } from "lucide-react";
import { type Candidate } from "@shared/schema";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Dashboard() {
  const [sortMethod, setSortMethod] = useState<'score' | 'experience' | 'education'>('score');
  const { data: candidates, isLoading } = useQuery<Candidate[]>({
    queryKey: ["/api/candidates"]
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const sortedCandidates = [...(candidates || [])].sort((a, b) => {
    switch (sortMethod) {
      case 'score':
        return b.score - a.score;
      case 'experience':
        return b.strengths.join().includes('yrs') ? 1 : -1;
      case 'education':
        return b.strengths.join().includes('Certified') ? 1 : -1;
      default:
        return 0;
    }
  });

  const highestScore = Math.max(...(candidates?.map(c => c.score) || [0]));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-semibold text-white bg-primary/20 px-2 py-1 rounded">Plumber Applications</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Extend application period</DropdownMenuItem>
              <DropdownMenuItem>Pause applications</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">End job posting</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" size="sm" className="btn-yellow">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sort by {sortMethod.charAt(0).toUpperCase() + sortMethod.slice(1)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSortMethod('score')}>
              Best Score
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortMethod('experience')}>
              Longest Experience
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortMethod('education')}>
              Best Education
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card className="p-0">
        <div className="divide-y divide-border">
          {sortedCandidates?.map((candidate) => (
            <div
              key={candidate.id}
              className="flex items-center p-4 hover:bg-muted/50 transition-colors"
            >
              <Checkbox className="mr-4" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-white bg-primary/20 px-2 py-1 rounded inline-block">
                      {candidate.name}
                    </h3>
                  </div>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className={`text-sm px-2 py-1 rounded ${candidate.score === highestScore ? 'bg-yellow-500/20 text-yellow-500' : 'bg-primary/20 text-white'}`}>
                          Score: {candidate.score}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Score based on:</p>
                        <ul className="list-disc list-inside text-sm">
                          <li>Experience: {candidate.score > 80 ? 'Extensive' : 'Moderate'}</li>
                          <li>Skills Match: {candidate.score > 70 ? 'Strong' : 'Average'}</li>
                          <li>Certifications: {candidate.strengths.includes('Certified') ? 'Yes' : 'No'}</li>
                        </ul>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <div className="flex items-center gap-2">
                    <Button size="sm" className="btn-yellow">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button size="sm" className="btn-yellow">
                      <Send className="h-4 w-4 mr-2" />
                      Assignment
                    </Button>
                    <Button size="sm" className="btn-yellow">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem className="text-destructive">
                          <X className="h-4 w-4 mr-2" />
                          Send Rejection
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete Profile
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {candidate.strengths.map((strength, i) => (
                    <span key={i} className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded">
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}