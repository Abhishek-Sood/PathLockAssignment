export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Project {
  recommendedOrder: any;
  earliestDue: any;
  id: string;
  name: string;
  description?: string;
  title?: string;
}

export interface TaskItem {
  dueDate: string | number | Date;
  id: number;
  title: string;
  description?: string; // optional field
  isCompleted: boolean;
  projectId: number;
}
