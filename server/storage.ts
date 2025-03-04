import { type Candidate, type Assignment, type InsertCandidate, type InsertAssignment } from "@shared/schema";

export interface IStorage {
  getCandidates(): Promise<Candidate[]>;
  getCandidate(id: number): Promise<Candidate | undefined>;
  updateCandidateScore(id: number, score: number): Promise<Candidate>;
  createAssignment(assignment: InsertAssignment): Promise<Assignment>;
  getAssignment(id: number): Promise<Assignment | undefined>;
  updateAssignment(id: number, updates: Partial<Assignment>): Promise<Assignment>;
}

export class MemStorage implements IStorage {
  private candidates: Map<number, Candidate>;
  private assignments: Map<number, Assignment>;
  private currentAssignmentId: number;

  constructor() {
    this.candidates = new Map([
      [1, { id: 1, name: "John Doe", score: 85, strengths: ["5 yrs plumbing", "Certified", "Team leader"], position: "Plumber" }],
      [2, { id: 2, name: "Jane Smith", score: 70, strengths: ["3 yrs plumbing", "Problem solver", "Customer service"], position: "Plumber" }],
      [3, { id: 3, name: "Mike Lee", score: 60, strengths: ["2 yrs plumbing", "Quick learner", "Detail oriented"], position: "Plumber" }],
      // Additional candidates
      [4, { id: 4, name: "Sarah Johnson", score: 78, strengths: ["4 yrs plumbing", "Project management", "Emergency response"], position: "Plumber" }],
      [5, { id: 5, name: "David Wilson", score: 65, strengths: ["2 yrs plumbing", "Commercial experience", "Tool expertise"], position: "Plumber" }],
      [6, { id: 6, name: "Emily Brown", score: 82, strengths: ["6 yrs plumbing", "Team supervision", "Quality control"], position: "Plumber" }],
      [7, { id: 7, name: "Alex Martinez", score: 73, strengths: ["3 yrs plumbing", "Renovation specialist", "Client communication"], position: "Plumber" }],
      [8, { id: 8, name: "Chris Taylor", score: 68, strengths: ["2.5 yrs plumbing", "Residential focus", "Problem diagnosis"], position: "Plumber" }],
      [9, { id: 9, name: "Pat Anderson", score: 77, strengths: ["4.5 yrs plumbing", "Code compliance", "Safety specialist"], position: "Plumber" }],
      [10, { id: 10, name: "Jordan Lee", score: 71, strengths: ["3 yrs plumbing", "Digital tools", "Modern techniques"], position: "Plumber" }]
    ]);
    this.assignments = new Map();
    this.currentAssignmentId = 1;
  }

  async getCandidates(): Promise<Candidate[]> {
    return Array.from(this.candidates.values());
  }

  async getCandidate(id: number): Promise<Candidate | undefined> {
    return this.candidates.get(id);
  }

  async updateCandidateScore(id: number, score: number): Promise<Candidate> {
    const candidate = this.candidates.get(id);
    if (!candidate) throw new Error("Candidate not found");

    const updated = { ...candidate, score };
    this.candidates.set(id, updated);
    return updated;
  }

  async createAssignment(assignment: InsertAssignment): Promise<Assignment> {
    const id = this.currentAssignmentId++;
    const newAssignment = { ...assignment, id };
    this.assignments.set(id, newAssignment);
    return newAssignment;
  }

  async getAssignment(id: number): Promise<Assignment | undefined> {
    return this.assignments.get(id);
  }

  async updateAssignment(id: number, updates: Partial<Assignment>): Promise<Assignment> {
    const assignment = this.assignments.get(id);
    if (!assignment) throw new Error("Assignment not found");

    const updated = { ...assignment, ...updates };
    this.assignments.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();