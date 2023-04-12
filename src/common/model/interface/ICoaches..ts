import { CoachStatus } from '../coachStatus';

export interface ICoaches {
  id: number;
  name: string;
  status: CoachStatus.ACTIVE;
  createdAt?: number;
  updatedAt?: number;
}
