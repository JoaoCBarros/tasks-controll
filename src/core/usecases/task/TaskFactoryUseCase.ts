import { DateTime } from "ts-luxon";
import { TTaskStatus } from "../../entities/Task/Dto/TaskDto";
import TaskFactory from "../../entities/Task/Factory/TaskFactory";
import Task from "../../entities/Task/Task";

export default class TaskFactoryUseCase implements TaskFactory {
  formatTasksList(unformattedTasksList: Task[]): Task[] {
    const calculatedStatusTasksList =
      this.calculateStatusToTaskList(unformattedTasksList);

    const verifiedOverdueTasksList = this.checkOverdueInTasksList(
      calculatedStatusTasksList
    );

    return verifiedOverdueTasksList;
  }

  checkOverdueInTasksList(tasksList: Task[]): Task[] {
    return tasksList.reduce((acc, cur) => {
      const isOverDue = this.verifyOverdue(cur.expiresAt as DateTime);
      return [
        ...acc,
        {
          ...cur,
          isOverdue: isOverDue,
        },
      ];
    }, []);
  }
  verifyOverdue(expiresAt: DateTime): boolean {
    const dateNow = DateTime.now();
    return expiresAt < dateNow;
  }
  calculateStatusToTaskList(unCalculatedStatusTasksList: Task[]): Task[] {
    const dateNow = DateTime.now();

    return unCalculatedStatusTasksList.reduce((acc, cur) => {
      const status = this.calculeStatus(cur.expiresAt);

      return [
        ...acc,
        {
          ...cur,
          status,
        },
      ];
    }, []);
  }

  calculeStatus(expiresAt) {
    const dateNow = DateTime.now();
    const dateDiffInDays = Math.round(
      (expiresAt as DateTime).diff(dateNow, ["days"]).days
    );
    const green = 4;
    const red = 1;
    let status: TTaskStatus;

    if (dateDiffInDays <= red) {
      status = "RED";
    }

    if (dateDiffInDays > red && dateDiffInDays < green) {
      status = "YELLOW";
    }

    if (dateDiffInDays >= green) {
      status = "GREEN";
    }

    return status;
  }
}
