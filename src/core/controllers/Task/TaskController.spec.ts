import { DateTime } from "ts-luxon";
import { makeTaskController } from "../../factories/Task/TaskControllerFactory";

describe("TaskController", () => {
  const taskController = makeTaskController();

  it("Should create task", async () => {
    const task = await taskController.createTask({
      auth: { userId: "1" },
      body: {
        title: "My first task",
        description: "This is my firts task",
        expiresAt: DateTime.now().plus({ days: 2 }),
      },
    });

    expect(typeof task.id === "string").toBe(true);
    expect(task.title).toBe("My first task");
    expect(task.description).toBe("This is my first task");
  });
});
