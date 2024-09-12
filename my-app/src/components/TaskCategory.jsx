import React from 'react';
import TaskCard from './TaskCard';

const TaskCategory = ({ groupKey, tasks, users, count, grouping }) => {
  const getUser = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : 'Unknown';
  };

  const categoryTitle = () => {
    if (grouping === 'user') {
      return getUser(groupKey);
    } else {
      return groupKey;
    }
  };

  if (!tasks || !users) {
    return <div className="task-category">Loading...</div>;
  }

  return (
    <div className="task-category">
      <h2>{categoryTitle()} ({count})</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskCard task={task} users={users} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  taskCategory: {
    marginBottom: 20,
    padding: 20,
    border: '1px solid #ddd',
    borderRadius: 10,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  },
  h2: {
    marginTop: 0
  },
  ul: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  li: {
    marginBottom: 10
  }
};

export default TaskCategory;