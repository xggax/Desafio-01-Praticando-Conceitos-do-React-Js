import styles from './NotFoundTask.module.css';
import clipboard from './assets/clipboard.svg';

export function NotFoundTask(){
  return (
    <div className={styles.noTasks}>
      <img src={clipboard} alt="imagem que representa que não há tarefas"/>
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <span>Crie tarefas e organize seus itens a fazer</span>
    </div>
  );
}