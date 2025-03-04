import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const candidates = pgTable("candidates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  score: integer("score").notNull(),
  strengths: text("strengths").array().notNull(),
  position: text("position").notNull(),
});

export const assignments = pgTable("assignments", {
  id: serial("id").primaryKey(),
  candidateId: integer("candidate_id").notNull(),
  task: text("task").notNull(),
  response: text("response"),
  score: integer("score"),
  completed: boolean("completed").default(false),
});

export const insertCandidateSchema = createInsertSchema(candidates);
export const insertAssignmentSchema = createInsertSchema(assignments);

export type InsertCandidate = z.infer<typeof insertCandidateSchema>;
export type Candidate = typeof candidates.$inferSelect;
export type InsertAssignment = z.infer<typeof insertAssignmentSchema>;
export type Assignment = typeof assignments.$inferSelect;