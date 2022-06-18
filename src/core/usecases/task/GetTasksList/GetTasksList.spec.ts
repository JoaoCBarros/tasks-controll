import { DateTime } from "ts-luxon";
import TaskRepositoryMemory from "../../../../infra/repositories/teste/TaskRepositoryMemory";
import AddTask from "../AddTask/AddTask";
import TaskFactoryUseCase from "../TaskFactoryUseCase";
import GetTasksList from "./GetTasksList";

describe("GetTasksList", () => {
  it("Should have 3 tasks in List", async () => {
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
    await addTask.execute({
      title: "My First Task",
      description: "Learn the Bank Manual",
      expiresAt: DateTime.fromISO("2022-06-17T00:00:00"),
      userId: "any_user_id",
    });
    await addTask.execute({
      title: "My First Task",
      description: "Learn the Bank Manual",
      expiresAt: DateTime.fromISO("2022-06-17T00:00:00"),
      userId: "any_user_id",
    });

    const tasksList = await getTasksList.execute();
    expect(tasksList.length).toBe(3);
  });

  it("Should have 2 overdue tasks and 1 valid task in List", async () => {
    const taskRepositoryMemory = new TaskRepositoryMemory();
    const taskFactory = new TaskFactoryUseCase();
    const addTask = new AddTask(taskRepositoryMemory);
    const getTasksList = new GetTasksList(taskRepositoryMemory, taskFactory);

    await addTask.execute({
      title: "My First Task",
      description: "Learn the Bank Manual",
      expiresAt: DateTime.fromISO("2022-01-01T00:00:00"),
      userId: "any_user_id",
    });
    await addTask.execute({
      title: "My First Task",
      description: "Learn the Bank Manual",
      expiresAt: DateTime.fromISO("2022-01-01T00:00:00"),
      userId: "any_user_id",
    });
    await addTask.execute({
      title: "My First Task",
      description: "Learn the Bank Manual",
      expiresAt: DateTime.now().plus({ days: 1 }),
      userId: "any_user_id",
    });

    const tasksList = await getTasksList.execute();
    expect(tasksList[0].isOverdue).toBe(true);
    expect(tasksList[1].isOverdue).toBe(true);
    expect(tasksList[2].isOverdue).toBe(false);
  });

  it("Should get tasks list in order by ExpiresAt", async () => {
    const taskRepositoryMemory = new TaskRepositoryMemory();
    const taskFactory = new TaskFactoryUseCase();
    const addTask = new AddTask(taskRepositoryMemory);
    const getTasksList = new GetTasksList(taskRepositoryMemory, taskFactory);

    await addTask.execute({
      title: "My First Task",
      description: "Learn the Bank Manual",
      expiresAt: DateTime.now().plus({ days: 4 }),
      userId: "any_user_id",
    });
    await addTask.execute({
      title: "My Second Task",
      description: "Learn the Bank Manual",
      expiresAt: DateTime.now().plus({ days: 1 }),
      userId: "any_user_id",
    });
    await addTask.execute({
      title: "My Three Task",
      description: "Learn the Bank Manual",
      expiresAt: DateTime.now().plus({ days: 2 }),
      userId: "any_user_id",
    });

    const tasksList = await getTasksList.execute();

    expect(tasksList[0].title).toBe("My Second Task");
    expect(tasksList[1].title).toBe("My Three Task");
    expect(tasksList[2].title).toBe("My First Task");
  });
});
