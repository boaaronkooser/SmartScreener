import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertAssignmentSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.get("/api/candidates", async (_req, res) => {
    const candidates = await storage.getCandidates();
    res.json(candidates);
  });

  app.post("/api/assignments", async (req, res) => {
    const result = insertAssignmentSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: "Invalid assignment data" });
    }

    const assignment = await storage.createAssignment(result.data);
    res.json(assignment);
  });

  app.patch("/api/assignments/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const updates = req.body;
    
    try {
      const updated = await storage.updateAssignment(id, updates);
      res.json(updated);
    } catch (error) {
      res.status(404).json({ error: "Assignment not found" });
    }
  });

  app.patch("/api/candidates/:id/score", async (req, res) => {
    const id = parseInt(req.params.id);
    const { score } = req.body;
    
    try {
      const updated = await storage.updateCandidateScore(id, score);
      res.json(updated);
    } catch (error) {
      res.status(404).json({ error: "Candidate not found" });
    }
  });

  return createServer(app);
}
