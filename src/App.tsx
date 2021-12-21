import React, { useState, useReducer, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";
import TimeEntry from "./TimeEntry";
import { ProjectModel, TimeEntryModel } from "../Types";
import projects from "./projects";

const entryPlaceholder = {
  id: "temp",
  project: projects[0],
  note: "",
  isRunning: false,
};

function App() {
  const [isTimeEntryEditing, setIsTimeEntryEditing] = useState(false);
  const [editingTimeEntry, setEditingTimeEntry] = useState<TimeEntryModel>();

  const [timeEntries, timeEntriesDispatch] = useReducer(
    (
      state: TimeEntryModel[],
      { action, payload }: { action: string; payload?: TimeEntryModel }
    ) => {
      switch (action) {
        case "add":
          return payload ? [...state, payload] : state;
        case "remove":
          // TODO: Add remove logic
          return state;
        case "reset":
          return [];
        case "startTimer":
          // TODO: Make it track actual time
          // TODO: Make sure only one timer can be started at a time
          return payload
            ? state.map((item) =>
                item.id === payload.id ? { ...item, isRunning: true } : item
              )
            : state;
        case "stopTimer":
          return payload
            ? state.map((item) =>
                item.id === payload.id ? { ...item, isRunning: false } : item
              )
            : state;
        default:
          return state;
      }
    },
    []
  );

  const onAdd = () => {
    setEditingTimeEntry(entryPlaceholder);
    setIsTimeEntryEditing(true);
  };

  const onTimerRemove = (timeEntry: TimeEntryModel) => {
    timeEntriesDispatch({ action: "remove", payload: timeEntry });
  };

  const onTimerStart = (timeEntry: TimeEntryModel) => {
    timeEntriesDispatch({ action: "startTimer", payload: timeEntry });
  };

  const onTimerStop = (timeEntry: TimeEntryModel) => {
    timeEntriesDispatch({ action: "stopTimer", payload: timeEntry });
  };

  const onReset = () => {
    timeEntriesDispatch({ action: "reset" });
  };

  const onTimeEntrySubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const entry: TimeEntryModel = {
      id: uuidv4(),
      note: editingTimeEntry?.note || "",
      project: projects.find(
        (item) => item.id === editingTimeEntry?.project.id
      ) as ProjectModel,
      isRunning: true,
    };

    timeEntriesDispatch({
      action: "add",
      payload: entry,
    });

    setIsTimeEntryEditing(false);
  };

  const onProjectSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const project = projects.find((item) => item.id === +e.target.value);
    const entry = {
      ...editingTimeEntry,
      project,
    } as TimeEntryModel;

    setEditingTimeEntry(entry);
  };

  const onNoteEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const entry = {
      ...editingTimeEntry,
      note: e.target.value,
    } as TimeEntryModel;

    setEditingTimeEntry(entry);
  };

  const onCancel = () => {
    setEditingTimeEntry(entryPlaceholder);
    setIsTimeEntryEditing(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Time Tracker</h1>
        {!isTimeEntryEditing && (
          <>
            <ul className="App-time-list">
              {timeEntries.map((entry: TimeEntryModel) => (
                <li key={entry.id}>
                  <TimeEntry
                    timeEntry={entry}
                    onRemove={onTimerRemove}
                    onStart={onTimerStart}
                    onStop={onTimerStop}
                  />
                </li>
              ))}
            </ul>
            <div className="App-actions">
              <button className="Primary-button" type="button" onClick={onAdd}>
                Add Entry
              </button>
              <button className="Reset-button" type="button" onClick={onReset}>
                Reset
              </button>
            </div>
          </>
        )}

        {isTimeEntryEditing && (
          <form className="TimeEntryEditor-form" onSubmit={onTimeEntrySubmit}>
            <label htmlFor="project">
              <span className="label-text">Project</span>
              <div className="select">
                <select
                  onChange={onProjectSelect}
                  value={editingTimeEntry?.project?.id}
                >
                  {projects.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <label htmlFor="note">
              <span className="label-text">Note</span>
              <textarea
                id="note"
                placeholder="Enter your note"
                rows={3}
                value={editingTimeEntry?.note}
                onChange={onNoteEdit}
              />
            </label>

            <div className="App-actions">
              <button className="Primary-button" type="submit">
                Start Timer
              </button>
              <button className="Reset-button" type="button" onClick={onCancel}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </header>
    </div>
  );
}

export default App;
