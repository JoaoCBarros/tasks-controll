import { DateTime } from "ts-luxon";
import TaskRepositoryMemory from "../../../../infra/repositories/teste/TaskRepositoryMemory";
import GetTasksList from "../GetTasksList/GetTasksList";
import TaskFactoryUseCase from "../TaskFactoryUseCase";
import AddTask from "./AddTask";

describe("AddTaskUseCase", () => {
  it("Should add one task", async () => {
    const taskRepositoryMemory = new TaskRepositoryMemory();
    const taskFactory = new TaskFactoryUseCase();
    const addTask = new AddTask(taskRepositoryMemory);
    const getTasksList = new GetTasksList(taskRepositoryMemory, taskFactory);

    await addTask.execute({
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
