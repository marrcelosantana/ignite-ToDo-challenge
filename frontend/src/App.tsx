import { useEffect, useState } from "react";

import { Header } from "./components/Header";
import { ActivityCard } from "./components/ActivityCard";
import { Activity } from "./models/Activity";
import { api } from "../src/server/api";

import { PlusCircle } from "phosphor-react";

import styles from "./styles/app.module.scss";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  function loadActivities() {
    api.get("/activities").then((response) => {
      setActivities(response.data);
    });
  }

  useEffect(() => {
    loadActivities();
    console.log(activities);
  }, []);

  return (
    <div className="App">
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <form className={styles.form}>
            <input
              type="text"
              name="actvity"
              id="actvity"
              placeholder="Adicione uma nova tarefa"
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
                <div className={styles.numberOfActivity}>5</div>
              </div>
              <div className={styles.activitiesConcluded}>
                <span>Concluídas</span>
                <div className={styles.numberOfActivity}>2 de 5</div>
              </div>
            </div>
            <div className={styles.activitiesList}>
              {activities.map((activity: Activity) => (
                <ActivityCard
                  key={activity.id}
                  description={activity.description}
                  concluded={activity.concluded}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
