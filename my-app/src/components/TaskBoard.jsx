import React from 'react';
import TaskCategory from './TaskCategory';

// Extracted functions
const groupBy = (tickets, key) => {
  return tickets.reduce((result, ticket) => {
    const groupKey = key === 'user' ? ticket.userId : ticket[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(ticket);
    return result;
  }, Object.create(null));
};

const sortTasks = (tasks, ordering) => {
  return tasks.sort((a, b) => {
    if (ordering === 'priority') {
      return b.priority - a.priority;  // Descending order for priority
    } else {
      return a.title.localeCompare(b.title);  // Ascending order for title
    }
  });
};

const calculateCounts = (groupedTasks) => {
  const counts = {};
  Object.keys(groupedTasks).forEach((key) => {
    counts[key] = groupedTasks[key].length;
  });
  return counts;
};

const TaskBoard = ({
  taskData,
  users,
  grouping,
  ordering,
}: {
  taskData: any[];
  users: any[];
  grouping: string;
  ordering: string;
}) => {
  const groupedTasks = groupBy(taskData, grouping);
  const counts = calculateCounts(groupedTasks);

  return (
    <div className="task-board">
      {Object.keys(groupedTasks).map((groupKey) => (
        <TaskCategory
          key={groupKey}
          groupKey={groupKey}
          tasks={sortTasks(groupedTasks[groupKey], ordering)}
          users={users}
          count={counts[groupKey]}  // Pass the count to TaskCategory
          grouping={grouping}
        />
      ))}
    </div>
  );
};

export default TaskBoard;