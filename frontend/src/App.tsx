import { FormEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Header } from "./components/Header";
import { TaskCard } from "./components/TaskCard";
import { Task } from "./models/Task";
import { api } from "../src/server/api";

import { PlusCircle } from "phosphor-react";
import ClipboardImg from "./assets/Clipboard.svg";

import styles from "./app.module.scss";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [taskStatus, setTaskStatus] = useState<boolean>(false);

  async function loadTasks() {
    await api.get("/tasks").then((response) => {
      setTasks(response.data);
    });
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleCreateTask(event: FormEvent) {
    event.preventDefault();

    try {
      const data = {
        id: "",
        description: taskDescription,
        isDone: false,
      };

      await api.post("/tasks", data);
      toast.success("Atividade adicionada com sucesso!!");

      setTaskDescription("");
      loadTasks();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleChangeStatus(id: string) {
    try {
      setTaskStatus(!taskStatus);

      const data = {
        isDone: taskStatus,
      };

      await api.put(`tasks/${id}`, data);
      loadTasks();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteTask(id: string) {
    try {
      await api.delete(`tasks/${id}`);
      setTasks(tasks.filter((task) => task.id === id));

      toast("Deletado com sucesso!!", {
        icon: "🗑️",
      });

      loadTasks();
    } catch (error) {
      toast.error("Erro ao deletar atividade.");
    }
  }

  function findTaskDone() {
    let taskDones = [];

    tasks.filter((task) => {
      if (task.isDone === true) {
        taskDones.push(task);
      }
    });

    return taskDones.length;
  }

  return (
    <div className="App">
      <Toaster />
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <form className={styles.form} onSubmit={handleCreateTask}>
            <input
              type="text"
              id="task"
              value={taskDescription}
              placeholder="Adicione uma nova tarefa"
              onChange={(e) => setTaskDescription(e.target.value)}
              required
            />
            <button type="submit" className={styles.createTaskButton}>
              <span>Criar</span>
              <PlusCircle color="white" size={20} />
            </button>
          </form>

          <div className={styles.tasksContainer}>
            <div className={styles.tasksInfo}>
              <div className={styles.tasksCreated}>
                <span style={{ color: "#4ea8de" }}>Tarefas criadas</span>
                <div className={styles.numberOfTask}>{tasks.length}</div>
              </div>
              <div className={styles.tasksDone}>
                <span>Concluídas:</span>
                <div className={styles.numberOfTask}>
                  {findTaskDone() === 0 ? (
                    <p>Nenhuma</p>
                  ) : (
                    <p>
                      {findTaskDone()} de {tasks.length}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {tasks.length > 0 ? (
              <div className={styles.tasksList}>
                {tasks.map((task: Task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    deleteTask={() => handleDeleteTask(task.id)}
                    changeStatus={() => handleChangeStatus(task.id)}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.emptyList}>
                <img src={ClipboardImg} />
                <div className={styles.emptyInfo}>
                  <p>Você ainda não tem tarefas cadastradas</p>
                  <span>Crie tarefas e organize seus itens a fazer</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
