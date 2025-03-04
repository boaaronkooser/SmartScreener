import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Loader2 } from "lucide-react";

export default function Assignment() {
  const [location, setLocation] = useLocation();
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [task, setTask] = useState("");
  const [response, setResponse] = useState("");
  
  const staticQuestions = [
    "How much wood is needed?",
    "What's your cost estimate?",
    "How long will it take?"
  ];

  const createAssignment = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/assignments", {
        candidateId: parseInt(id!),
        task,
        completed: false
      });
    },
    onSuccess: () => {
      toast({
        title: "Assignment Created",
        description: "The assignment has been sent to the candidate"
      });
      setLocation("/");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) {
      toast({
        title: "Error",
        description: "Please enter a task description",
        variant: "destructive"
      });
      return;
    }
    createAssignment.mutate();
  };

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Task Description</label>
              <Textarea
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Estimate materials for a roofing job"
              />
            </div>

            {task && (
              <div className="space-y-4">
                <h3 className="font-medium">Generated Questions</h3>
                <ul className="list-disc list-inside space-y-2">
                  {staticQuestions.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setLocation("/")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createAssignment.isPending}
              >
                {createAssignment.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Send Assignment
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
