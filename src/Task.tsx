import { Trash } from 'phosphor-react';
import styles from './Task.module.css';
import { TaskData } from './App';

interface TaskProps extends TaskData {
  onDeleteTask: (id: string) => void;
  onTaskStatusChange: (id: string) => void;
}

export function Task({ id, content, isDone, onDeleteTask, onTaskStatusChange }: TaskProps){
  function handleDeleteTask(){
    onDeleteTask(id);
  }

  function handleTaskStatusChange(){
    onTaskStatusChange(id);
  }

  return (
    <div className={styles.task}>
      <input 
        type="checkbox" 
        id={id} 
        name={id} 
        checked={isDone}
        onChange={handleTaskStatusChange}
      />
      <label htmlFor={id}>{ content }</label>
      
      <button title="Deletar Tarefa" onClick={handleDeleteTask}>
        <Trash size={24}/>
      </button>
    </div>
  )
}