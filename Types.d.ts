export interface TimeEntryModel {
  id: string;
  project: ProjectModel;
  note: string;
  isRunning: boolean;
}

export interface ProjectModel {
  id: number;
  name: string;
}
