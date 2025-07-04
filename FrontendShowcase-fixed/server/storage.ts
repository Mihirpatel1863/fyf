import { users, workspaces, caseFiles, type User, type InsertUser, type Workspace, type InsertWorkspace, type CaseFile, type InsertCaseFile } from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Workspace operations
  getWorkspaces(userId: number): Promise<Workspace[]>;
  getWorkspace(id: number): Promise<Workspace | undefined>;
  createWorkspace(workspace: InsertWorkspace): Promise<Workspace>;
  updateWorkspace(id: number, workspace: Partial<InsertWorkspace>): Promise<Workspace | undefined>;
  deleteWorkspace(id: number): Promise<boolean>;
  
  // Case file operations
  getCaseFiles(workspaceId: number): Promise<CaseFile[]>;
  createCaseFile(caseFile: InsertCaseFile): Promise<CaseFile>;
  deleteCaseFile(id: number): Promise<boolean>;
  
  // Dashboard metrics
  getDashboardMetrics(userId: number): Promise<{
    totalWorkspaces: number;
    totalSignedContracts: number;
    completedProjects: number;
    completedTranslations: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private workspaces: Map<number, Workspace>;
  private caseFiles: Map<number, CaseFile>;
  private currentUserId: number;
  private currentWorkspaceId: number;
  private currentCaseFileId: number;

  constructor() {
    this.users = new Map();
    this.workspaces = new Map();
    this.caseFiles = new Map();
    this.currentUserId = 1;
    this.currentWorkspaceId = 1;
    this.currentCaseFileId = 1;
    
    // Initialize with default user
    this.createUser({
      username: "johndoe",
      password: "password123",
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      role: "admin"
    });
    
    // Initialize with sample workspace
    this.createWorkspace({
      name: "Johnson & Partners Merger",
      caseType: "Corporate",
      summary: "Merger and acquisition case",
      complainant: "Johnson LLC",
      accused: "Partners Inc",
      validity: "Next Format",
      allegations: "Corporate merger disputes",
      factsSummary: "Complex merger case involving multiple stakeholders",
      dateOfIncident: "2024-05-03",
      representing: "Johnson LLC",
      client: "Johnson LLC",
      opponent: "Partners Inc",
      areaOfLaw: "Corporate Law",
      timeline: "3 Months",
      status: "active",
      userId: 1
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      id,
      username: insertUser.username,
      password: insertUser.password,
      email: insertUser.email,
      firstName: insertUser.firstName,
      lastName: insertUser.lastName,
      role: insertUser.role || "user",
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getWorkspaces(userId: number): Promise<Workspace[]> {
    return Array.from(this.workspaces.values()).filter(
      (workspace) => workspace.userId === userId,
    );
  }

  async getWorkspace(id: number): Promise<Workspace | undefined> {
    return this.workspaces.get(id);
  }

  async createWorkspace(insertWorkspace: InsertWorkspace): Promise<Workspace> {
    const id = this.currentWorkspaceId++;
    const workspace: Workspace = {
      id,
      name: insertWorkspace.name,
      caseType: insertWorkspace.caseType,
      summary: insertWorkspace.summary || null,
      complainant: insertWorkspace.complainant || null,
      accused: insertWorkspace.accused || null,
      validity: insertWorkspace.validity || null,
      allegations: insertWorkspace.allegations || null,
      factsSummary: insertWorkspace.factsSummary || null,
      dateOfIncident: insertWorkspace.dateOfIncident ? new Date(insertWorkspace.dateOfIncident) : null,
      representing: insertWorkspace.representing || null,
      client: insertWorkspace.client || null,
      opponent: insertWorkspace.opponent || null,
      areaOfLaw: insertWorkspace.areaOfLaw || null,
      timeline: insertWorkspace.timeline || null,
      status: insertWorkspace.status || "active",
      userId: insertWorkspace.userId || 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.workspaces.set(id, workspace);
    return workspace;
  }

  async updateWorkspace(id: number, updateData: Partial<InsertWorkspace>): Promise<Workspace | undefined> {
    const workspace = this.workspaces.get(id);
    if (!workspace) return undefined;

    const updatedWorkspace: Workspace = {
      ...workspace,
      name: updateData.name || workspace.name,
      caseType: updateData.caseType || workspace.caseType,
      summary: updateData.summary !== undefined ? updateData.summary : workspace.summary,
      complainant: updateData.complainant !== undefined ? updateData.complainant : workspace.complainant,
      accused: updateData.accused !== undefined ? updateData.accused : workspace.accused,
      validity: updateData.validity !== undefined ? updateData.validity : workspace.validity,
      allegations: updateData.allegations !== undefined ? updateData.allegations : workspace.allegations,
      factsSummary: updateData.factsSummary !== undefined ? updateData.factsSummary : workspace.factsSummary,
      dateOfIncident: updateData.dateOfIncident ? new Date(updateData.dateOfIncident) : workspace.dateOfIncident,
      representing: updateData.representing !== undefined ? updateData.representing : workspace.representing,
      client: updateData.client !== undefined ? updateData.client : workspace.client,
      opponent: updateData.opponent !== undefined ? updateData.opponent : workspace.opponent,
      areaOfLaw: updateData.areaOfLaw !== undefined ? updateData.areaOfLaw : workspace.areaOfLaw,
      timeline: updateData.timeline !== undefined ? updateData.timeline : workspace.timeline,
      status: updateData.status || workspace.status,
      userId: updateData.userId || workspace.userId,
      updatedAt: new Date(),
    };
    this.workspaces.set(id, updatedWorkspace);
    return updatedWorkspace;
  }

  async deleteWorkspace(id: number): Promise<boolean> {
    return this.workspaces.delete(id);
  }

  async getCaseFiles(workspaceId: number): Promise<CaseFile[]> {
    return Array.from(this.caseFiles.values()).filter(
      (file) => file.workspaceId === workspaceId,
    );
  }

  async createCaseFile(insertCaseFile: InsertCaseFile): Promise<CaseFile> {
    const id = this.currentCaseFileId++;
    const caseFile: CaseFile = {
      ...insertCaseFile,
      id,
      uploadedAt: new Date(),
    };
    this.caseFiles.set(id, caseFile);
    return caseFile;
  }

  async deleteCaseFile(id: number): Promise<boolean> {
    return this.caseFiles.delete(id);
  }

  async getDashboardMetrics(userId: number): Promise<{
    totalWorkspaces: number;
    totalSignedContracts: number;
    completedProjects: number;
    completedTranslations: number;
  }> {
    const userWorkspaces = await this.getWorkspaces(userId);
    const completedWorkspaces = userWorkspaces.filter(w => w.status === "completed");
    
    return {
      totalWorkspaces: userWorkspaces.length,
      totalSignedContracts: 61, // Mock data as per design
      completedProjects: completedWorkspaces.length,
      completedTranslations: 18, // Mock data as per design
    };
  }
}

export const storage = new MemStorage();
