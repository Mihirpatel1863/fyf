import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWorkspaceSchema, insertCaseFileSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get current user (simplified for demo)
  app.get("/api/user", async (req, res) => {
    try {
      const user = await storage.getUser(1); // Default user for demo
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get dashboard metrics
  app.get("/api/dashboard/metrics", async (req, res) => {
    try {
      const metrics = await storage.getDashboardMetrics(1); // Default user for demo
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get workspaces
  app.get("/api/workspaces", async (req, res) => {
    try {
      const workspaces = await storage.getWorkspaces(1); // Default user for demo
      res.json(workspaces);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get single workspace
  app.get("/api/workspaces/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const workspace = await storage.getWorkspace(id);
      if (!workspace) {
        return res.status(404).json({ message: "Workspace not found" });
      }
      res.json(workspace);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create workspace
  app.post("/api/workspaces", async (req, res) => {
    try {
      const validatedData = insertWorkspaceSchema.parse({
        ...req.body,
        userId: 1 // Default user for demo
      });
      const workspace = await storage.createWorkspace(validatedData);
      res.status(201).json(workspace);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Update workspace
  app.put("/api/workspaces/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertWorkspaceSchema.partial().parse(req.body);
      const workspace = await storage.updateWorkspace(id, validatedData);
      if (!workspace) {
        return res.status(404).json({ message: "Workspace not found" });
      }
      res.json(workspace);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Delete workspace
  app.delete("/api/workspaces/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteWorkspace(id);
      if (!success) {
        return res.status(404).json({ message: "Workspace not found" });
      }
      res.json({ message: "Workspace deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get case files for workspace
  app.get("/api/workspaces/:id/files", async (req, res) => {
    try {
      const workspaceId = parseInt(req.params.id);
      const files = await storage.getCaseFiles(workspaceId);
      res.json(files);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Upload case file
  app.post("/api/workspaces/:id/files", async (req, res) => {
    try {
      const workspaceId = parseInt(req.params.id);
      const validatedData = insertCaseFileSchema.parse({
        ...req.body,
        workspaceId
      });
      const file = await storage.createCaseFile(validatedData);
      res.status(201).json(file);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
