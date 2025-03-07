// tasks
export interface Task {
  id?: number;
  title: string;
  description: string;
  user_id: string;
  completed: boolean;
  priority: number;
}

export type Column = {
  key: string;
  label: string;
};