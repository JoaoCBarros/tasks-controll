import { DateTime } from "ts-luxon";
import TaskRepositoryMemory from "../../../../infra/repositories/teste/TaskRepositoryMemory";
import AddTask from "../AddTask/AddTask";
import GetOneTask from "../GetOneTask/GetOneTask";
import TaskFactoryUseCase from "../TaskFactoryUseCase";
import FinishTask from "./FinishTask";

describe("FinishTask", () => {
  it("Should finish task", async () => {
    const taskRepositoryMemory = new TaskRepositoryMemory();
    const taskFactory = new TaskFactoryUseCase();
    const addTask = new AddTask(taskRepositoryMemory);
    const finishTask = new FinishTask(taskRepositoryMemory);
    const getOneTask = new GetOneTask(taskRepositoryMemory, taskFactory);

    const addedTask = await addTask.execute({
      title: "My First Task",
      description: "Learn the Bank Manual",
      expiresAt: DateTime.fromISO("2022-06-18T23:59:59"),
      userId: "any_user_id",
    });

    await finishTask.execute(addedTask.id, "any_user_id");

    const task = await getOneTask.execute(addedTask.id);

    expect(task.isFinished).toBe(true);
  });

  it("Should get not finished task", async () => {
    const taskRepositoryMemory = new TaskRepositoryMemory();
    const taskFactory = new TaskFactoryUseCase();
    const addTask = new AddTask(taskRepositoryMemory);
    const getOneTask = new GetOneTask(taskRepositoryMemory, taskFactory);

    const addedTask = await addTask.execute({
      title: "My First Task",
      description: "Learn the Bank Manual",
      expiresAt: DateTime.fromISO("2022-06-18T23:59:59"),
      userId: "any_user_id",
    });

    const task = await getOneTask.execute(addedTask.id);

    expect(task.isFinished).toBe(false);
  });
});
