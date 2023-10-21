import { Header } from './Header';

import './global.css';
import styles from './App.module.css';
import { PlusCircle } from 'phosphor-react';
import { Task } from './Task';
import { NotFoundTask } from './NotFoundTask';
import { FormEvent, useState, ChangeEvent, InvalidEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface TaskType {
  id: string;
  content: string;
  isDone: boolean;
}

export function App(){
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTask, setNewTask] = useState("");

  function handleCreateNewTask(event: FormEvent){
    event?.preventDefault();
    
    const task = { content: newTask, isDone: false, id: uuidv4()};

    setTasks([...tasks, task]);
    setNewTask("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>){
    event.target.setCustomValidity('');
    setNewTask(event.target.value);
  }

  function deleteTask(idTaskToDelete: string){
    const tasksWithoutDeletedOne = tasks.filter( task => task.id !== idTaskToDelete);
    setTasks(tasksWithoutDeletedOne);
  }

  function taskStatusChange(idTaskToStatusChange: string){
    setTasks(
        tasks.map((task) =>
          task.id === idTaskToStatusChange
            ? { ...task, isDone: !task.isDone }
            : task
        )
      )
  }
  
  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>){
    event?.target.setCustomValidity('Este campo é obrigatório!');
  }

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <main>
          <form className={styles.createTaskForm} onSubmit={handleCreateNewTask}>
            <input
              value={newTask} 
              onChange={handleNewTaskChange} 
              placeholder='Adicione uma nova tarefa'
              onInvalid={handleNewTaskInvalid}
              required
            />
            <button type='submit'>Criar <PlusCircle size={16} weight="bold"/></button>
          </form>
          
          <div className={styles.taskBoard}>
            <div className={styles.taskBar}>
              <div className={styles.info} style={{ color: 'var(--blue)'}}>
                Tarefas criadas <span>{ tasks?.length }</span>
              </div>
              <div className={styles.info} style={{ color: 'var(--purple)'}}>
                Concluídas 
                <span>
                  { tasks?.length > 0 && `${tasks?.filter((task: TaskType) => task.isDone)?.length} de ` } 
                  {tasks?.length}
                </span>
              </div>
            </div>
            {
              tasks?.length > 0 ? tasks.map(
                (task: TaskType) => {
                  return (
                    <Task
                      key={task.id}
                      task={task}
                      onDeleteTask={deleteTask}
                      onTaskStatusChange={taskStatusChange}
                    />
                  )}
              ) : <NotFoundTask />
            }
          </div>
        </main>
      </div>
    </>
  );
}