import { DateTime } from "ts-luxon";
import { TTaskStatus } from "../../entities/Task/Dto/TaskDto";
import TaskFactory from "../../entities/Task/Factory/TaskFactory";
import Task from "../../entities/Task/Task";
import GetHourFormat from "../../util/GetHourFormat";

export default class TaskFactoryUseCase implements TaskFactory {
  calculateStatusToTaskList(unCalculatedStatusTasksList: Task[]): Task[] {
    const dateNow = DateTime.now();

    return unCalculatedStatusTasksList.reduce((acc, cur) => {
      const dateDiffInDays = (cur.expiresAt as DateTime).diff(dateNow, [
        "days",
      ]).days;
      const status = this.calculeStatus(dateDiffInDays);

      return [
        ...acc,
        {
          ...cur,
          status,
        },
      ];
    }, []);
  }

  calculeStatus(dateDiffInDays) {
    const green = 4;
    const yellow = 3;
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
