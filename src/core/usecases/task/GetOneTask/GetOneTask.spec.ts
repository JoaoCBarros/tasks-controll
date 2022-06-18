import { DateTime } from "ts-luxon";
import TaskRepositoryMemory from "../../../../infra/repositories/teste/TaskRepositoryMemory";
import { CTaskStatus } from "../../../entities/Task/Dto/TaskDto";
import AddTask from "../AddTask/AddTask";
import TaskFactoryUseCase from "../TaskFactoryUseCase";
import GetOneTask from "./GetOneTask";

describe("GetOneTask", () => {
  it("Should have status GREEN", async () => {
    const taskRepositoryMemory = new TaskRepositoryMemory();
    const taskFactory = new TaskFactoryUseCase();
    const addTask = new AddTask(taskRepositoryMemory);
    const getOneTask = new GetOneTask(taskRepositoryMemory, taskFactory);

    const dateGreen = DateTime.now().plus({ days: 4 });
    const addedTask = await addTask.execute({
      title: "My First Task",
      description: "Learn the Bank Manual",
      expiresAt: dateGreen,
      userId: "any_user_id",
    });

    const task = await getOneTask.execute(addedTask.id);
    expect(task.status).toBe(CTaskStatus.GREEN);
  });
  it("Should have status YELLOW", async () => {
    const taskRepositoryMemory = new TaskRepositoryMemory();
    const taskFactory = new TaskFactoryUseCase();
    const addTask = new AddTask(taskRepositoryMemory);
    const getOneTask = new GetOneTask(taskRepositoryMemory, taskFactory);

    const dateGreen = DateTime.now().plus({ days: 3 });
    const addedTask = await addTask.execute({
      title: "My First Task",
      description: "Learn the Bank Manual",
      expiresAt: dateGreen,
      userId: "any_user_id",
    });

    const task = await getOneTask.execute(addedTask.id);
    expect(task.status).toBe(CTaskStatus.YELLOW);
  });
  it("Should have status RED", async () => {
    const taskRepositoryMemory = new TaskRepositoryMemory();
    const taskFactory = new TaskFactoryUseCase();
    const addTask = new AddTask(taskRepositoryMemory);
    const getOneTask = new GetOneTask(taskRepositoryMemory, taskFactory);

    const dateGreen = DateTime.now().plus({ days: 1 });
    const addedTask = await addTask.execute({
      title: "My First Task",
      description: "Learn the Bank Manual",
      expiresAt: dateGreen,
      userId: "any_user_id",
    });

    const task = await getOneTask.execute(addedTask.id);
    expect(task.status).toBe(CTaskStatus.RED);
  });

  it("Should get Overdue Task", async () => {
    const taskRepositoryMemory = new TaskRepositoryMemory();
    const taskFactory = new TaskFactoryUseCase();
    const addTask = new AddTask(taskRepositoryMemory);
    const getOneTask = new GetOneTask(taskRepositoryMemory, taskFactory);

    const addedTask = await addTask.execute({
      title: "My First Task",
      description: "Learn the Bank Manual",
      expiresAt: DateTime.fromISO("2022-01-01T00:00:00"),
      userId: "any_user_id",
    });

    const task = await getOneTask.execute(addedTask.id);
    expect(task.isOverdue).toBe(true);
  });
});
