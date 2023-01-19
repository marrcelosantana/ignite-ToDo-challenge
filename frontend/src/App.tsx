import { FormEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Header } from "./components/Header";
import { ActivityCard } from "./components/ActivityCard";
import { Activity } from "./models/Activity";
import { api } from "../src/server/api";

import { PlusCircle } from "phosphor-react";
import ClipboardImg from "./assets/Clipboard.svg";

import styles from "./app.module.scss";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activityDescription, setActivityDescription] = useState<string>("");
  const [activityStatus, setActivityStatus] = useState<boolean>(false);

  async function loadActivities() {
    await api.get("/activities").then((response) => {
      setActivities(response.data);
    });
  }

  useEffect(() => {
    loadActivities();
    console.log(activities);
  }, []);

  async function handleCreateActivity(event: FormEvent) {
    event.preventDefault();

    try {
      const data = {
        id: "",
        description: activityDescription,
        concluded: false,
      };

      await api.post("/activities", data);
      toast.success("Atividade adicionada com sucesso!!");

      setActivityDescription("");
      loadActivities();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleChangeStatus(id: string) {
    try {
      setActivityStatus(!activityStatus);

      const data = {
        concluded: activityStatus,
      };

      await api.put(`activities/${id}`, data);
      loadActivities();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteActivity(id: string) {
    try {
      await api.delete(`activities/${id}`);
      setActivities(activities.filter((activity) => activity.id === id));

      toast("Deletado com sucesso!!", {
        icon: "🗑️",
      });

      loadActivities();
    } catch (error) {
      toast.error("Erro ao deletar atividade.");
    }
  }

  return (
    <div className="App">
      <Toaster />
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <form className={styles.form} onSubmit={handleCreateActivity}>
            <input
              type="text"
              id="activity"
              value={activityDescription}
              placeholder="Adicione uma nova tarefa"
              onChange={(e) => setActivityDescription(e.target.value)}
              required
            />
            <button type="submit" className={styles.createActivityButton}>
              <span>Criar</span>
              <PlusCircle color="white" size={20} />
            </button>
          </form>

          <div className={styles.activitiesContainer}>
            <div className={styles.activitiesInfo}>
              <div className={styles.activitiesCreated}>
                <span style={{ color: "#4ea8de" }}>Tarefas criadas</span>
                <div className={styles.numberOfActivity}>
                  {activities.length}
                </div>
              </div>
              <div className={styles.activitiesConcluded}>
                <span>Concluídas</span>
                <div className={styles.numberOfActivity}>
                  2 de {activities.length}
                </div>
              </div>
            </div>
            {activities.length > 0 ? (
              <div className={styles.activitiesList}>
                {activities.map((activity: Activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    deleteActivity={() => handleDeleteActivity(activity.id)}
                    changeStatus={() => handleChangeStatus(activity.id)}
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
