export type TTaskStatus = "GREEN" | "YELLOW" | "RED";
export const CTaskStatus = {
  GREEN: "GREEN",
  YELLOW: "YELLOW",
  RED: "RED",
};
export interface GetTasksListQueryParams {
  search?: string;
  userId?: string;
}
