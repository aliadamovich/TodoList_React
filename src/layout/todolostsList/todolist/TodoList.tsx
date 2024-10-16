import { AddItemInput } from "../../../components/addItemInput/AddItemInput";
import { Chip, Divider, Grid, List, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch } from "../../../store/store";
import { createTaskTC, getTasksTC, selectTasks } from "../../../store/slices/tasksSlice";
import {
	changeTodolistFilter,
  changeTodolistTitleTC,
  FilterValueType,
  removeTodolistTC,
  TodolistDomainType,
} from "store/slices/todolistSlice";
import { todolistTitleStyle } from "../../../styles/Todolost.styles";
import { EditableSpan } from "../../../components/editableSpan/EditableSpan";
import React, { useCallback, useEffect } from "react";
import { FilterButton } from "../../../components/FilterButton";
import { Task } from "./tasks/Task";
import { TaskStatuses } from "../../../features/lib/enums/enums";
import { TaskDomainType } from "api/todolists-api";

export type TodoListProps = {
  todolist: TodolistDomainType;
};

export const TodoList = React.memo(({ todolist }: TodoListProps) => {
  const { id, filter, title, entityStatus, ...restProps } = todolist;

	// let tasks = useSelector<AppRootStateType, TaskDomainType[]>((state) => state.tasks[id]);
	let tasks = useSelector((state: AppRootStateType) => selectTasks(state, id));
	const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(getTasksTC(id));
  // }, [todolist]);

  //*tasks
  // добавление таски
  const addTaskCallback = useCallback(
    (value: string) => {
      dispatch(createTaskTC(id, value));
    },
    [createTaskTC, id, dispatch],
  );

  //* todolists
  //удаление всего тудулиста
  const removeTodoListHandler = useCallback(() => {
    dispatch(removeTodolistTC(id));
  }, [id, dispatch]);

  //изменение названия тудулиста
  const changeTodoTitleCallback = useCallback(
    (newTitle: string) => {
      dispatch(changeTodolistTitleTC(id, newTitle));
    },
    [id, dispatch],
  );

  //фильтрация
  const changeFilterHandler = (filter: FilterValueType) => {
    dispatch(changeTodolistFilter({id, filter}));
  };

  //функции для смены фильтра по наажтию на ryjgre
  const onAllClickHandler = useCallback(() => changeFilterHandler("All"), []);
  const onActiveClickHandler = useCallback(() => changeFilterHandler("Active"), []);
  const onCompletedClickHandler = useCallback(() => changeFilterHandler("Completed"), []);

  //создаю фиьтрующую функцию чтобы в разных местах разместить таски сделанные и невыполненные
  const filterTasks = (status: 0 | 2): JSX.Element[] => {
    let tasksForFilter = tasks;

    if (filter === "Completed") {
      tasksForFilter = tasks.filter((t) => t.status === TaskStatuses.Completed);
    } else if (filter === "Active") {
      tasksForFilter = tasks.filter((t) => t.status === TaskStatuses.New);
    }
    if (tasksForFilter) {
      return tasksForFilter.filter((t) => t.status === status).map((t) => <Task {...t} key={t.id} todolistId={id} />);
    } else return [];
  };

  return (
    <Grid item xs={12} md={6}>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <h2 style={todolistTitleStyle}>
          <EditableSpan
            title={title}
            onChange={changeTodoTitleCallback}
            removeItem={removeTodoListHandler}
            disabled={entityStatus === "loading"}
          />
        </h2>

        <List
          sx={{
            flex: "1 1 auto",
            mt: "10px",
          }}
        >
          {!filterTasks(0).length ? <div>No tasks</div> : filterTasks(0)}

          {filterTasks(2).length > 0 && (
            <>
              <Divider
                textAlign="right"
                sx={{
                  m: "10px 0",
                }}
              >
                <Chip label="Done" size="small" />
              </Divider>
              {filterTasks(2)}
            </>
          )}
        </List>

        <div
          style={{
            margin: "20px 0",
            display: "flex",
            gap: "8px",
          }}
        >
          <FilterButton children="All" onClick={onAllClickHandler} variant={filter === "All" ? "contained" : "text"} />
          <FilterButton
            children="Active"
            onClick={onActiveClickHandler}
            variant={filter === "Active" ? "contained" : "text"}
          />
          <FilterButton
            children="Completed"
            onClick={onCompletedClickHandler}
            variant={filter === "Completed" ? "contained" : "text"}
            color="secondary"
          />
        </div>

        <AddItemInput addItem={addTaskCallback} label="Add new task" disabled={entityStatus === "loading"} />
      </Paper>
    </Grid>
  );
});
