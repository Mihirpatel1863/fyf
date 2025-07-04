import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  role: text("role").notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const workspaces = pgTable("workspaces", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  caseType: text("case_type").notNull(),
  summary: text("summary"),
  complainant: text("complainant"),
  accused: text("accused"),
  validity: text("validity"),
  allegations: text("allegations"),
  factsSummary: text("facts_summary"),
  dateOfIncident: timestamp("date_of_incident"),
  representing: text("representing"),
  client: text("client"),
  opponent: text("opponent"),
  areaOfLaw: text("area_of_law"),
  timeline: text("timeline"),
  status: text("status").notNull().default("active"),
  userId: integer("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const caseFiles = pgTable("case_files", {
  id: serial("id").primaryKey(),
  workspaceId: integer("workspace_id").notNull(),
  fileName: text("file_name").notNull(),
  fileSize: integer("file_size").notNull(),
  mimeType: text("mime_type").notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
  role: true,
});

export const insertWorkspaceSchema = createInsertSchema(workspaces).pick({
  name: true,
  caseType: true,
  summary: true,
  complainant: true,
  accused: true,
  validity: true,
  allegations: true,
  factsSummary: true,
  dateOfIncident: true,
  representing: true,
  client: true,
  opponent: true,
  areaOfLaw: true,
  timeline: true,
  status: true,
  userId: true,
}).extend({
  dateOfIncident: z.string().optional(),
});

export const insertCaseFileSchema = createInsertSchema(caseFiles).pick({
  workspaceId: true,
  fileName: true,
  fileSize: true,
  mimeType: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertWorkspace = z.infer<typeof insertWorkspaceSchema>;
export type Workspace = typeof workspaces.$inferSelect;
export type InsertCaseFile = z.infer<typeof insertCaseFileSchema>;
export type CaseFile = typeof caseFiles.$inferSelect;
