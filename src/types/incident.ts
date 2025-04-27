export type Severity = "Low" | "Medium" | "High";

export interface Incident {
  id: number;
  title: string;
  description: string;
  severity: Severity;
  reported_at: string; // ISO date
}

export interface IncidentFilters {
  severity: Severity | "All";
  sortOrder: "newest" | "oldest";
  search?: string;
}