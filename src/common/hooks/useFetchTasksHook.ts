import {useState} from 'react';
import apiService from '../../services/apiService';
import {ITask} from '../interfaces/TaskInterface';

export const useFetchTasks = (endpoint: string) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async (token: string) => {
    try {
      const data = await apiService.fetchTasks(endpoint, token);
      setTasks(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {tasks, loading, error, fetchTasks};
};
