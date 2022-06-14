import { DateTime } from "ts-luxon";
import TaskRepositoryMemory from "../../../../infra/repositories/TaskRepositoryMemory";
import GetTasksList from "../GetTasksList/GetTasksList";
import TaskFactoryUseCase from "../TaskFactoryUseCase";
import AddTaskUseCase from "./AddTaskUseCase";

describe("AddTaskUseCase", () => {
  it("Should add one task", async () => {
    const taskRepositoryMemory = new TaskRepositoryMemory();
    const taskFactory = new TaskFactoryUseCase();
    const addTaskUseCase = new AddTaskUseCase(taskRepositoryMemory);
    const getTasksList = new GetTasksList(taskRepositoryMemory, taskFactory);

    await addTaskUseCase.execute({
      title: "My First Task",
      description: "Learn the Bank Manual",
      expiresAt: DateTime.fromISO("2022-06-17T00:00:00"),
      userId: "any_user_id",
    });

    const tasksListAfterAddOneTask = await getTasksList.execute();
    expect(tasksListAfterAddOneTask.length).toBe(1);
  });
  it("Should no have any task", async () => {
    const taskRepositoryMemory = new TaskRepositoryMemory();
    const taskFactory = new TaskFactoryUseCase();
    const getTasksList = new GetTasksList(taskRepositoryMemory, taskFactory);
    const tasksListTask = await getTasksList.execute();

    expect(tasksListTask.length).toBe(0);
  });
});
