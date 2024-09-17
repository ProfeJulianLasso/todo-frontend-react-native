import {useState} from 'react';
import {ITask} from '../interfaces/TaskInterface';

export const useModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  const handleOpenModal = (task: ITask) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedTask(null);
  };

  return {modalVisible, selectedTask, handleOpenModal, handleCloseModal};
};
