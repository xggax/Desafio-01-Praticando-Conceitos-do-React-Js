import { Trash } from 'phosphor-react';
import styles from './Task.module.css';
import { TaskType } from './App';

interface TaskProps {
  task: TaskType;
  onDeleteTask: (id: string) => void;
  onTaskStatusChange: (id: string) => void;
}

export function Task({ task: { id, content, isDone }, onDeleteTask, onTaskStatusChange }: TaskProps){
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