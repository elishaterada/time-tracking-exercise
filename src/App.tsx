import React, { useState } from "react";

import "./App.css";
import TimeEntry from "./TimeEntry";
import { TimeEntryModel } from "../Types";
import EntryForm from "./EntryForm";

function App() {
  // TODO: Bonus - Instead of handling just one time entry, support multiple time entries
  const [timeEntry, setTimeEntry] = useState<TimeEntryModel | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const onAdd = () => {
    setIsAdding(true);
  };

  const onTimerRemove = () => {
    setTimeEntry(null);
  };

  const onTimerStart = () => {
    if (!timeEntry) return;
    // TODO: Add time tracking logic and store final duration
    setTimeEntry({ ...timeEntry, isRunning: true });
  };

  const onTimerStop = () => {
    if (!timeEntry) return;
    // TODO: Add stop logic
    setTimeEntry({ ...timeEntry, isRunning: false });
  };

  const onTimeEntrySubmit = (entry: TimeEntryModel) => {
    setTimeEntry(entry);
    setIsAdding(false);
  };

  const onCancel = () => {
    setTimeEntry(null);
    setIsAdding(false);
  };

  const onTimerEdit = () => {
    // TODO: Implement edit logic
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Time Tracker</h1>
        {!isAdding && (
          <>
            <ul className="App-time-list">
              {timeEntry && (
                <li>
                  <TimeEntry
                    timeEntry={timeEntry}
                    onRemove={onTimerRemove}
                    onStart={onTimerStart}
                    onStop={onTimerStop}
                    onEdit={onTimerEdit}
                  />
                </li>
              )}
            </ul>
            <div className="App-actions">
              {!timeEntry && (
                <button
                  className="Primary-button"
                  type="button"
                  onClick={onAdd}
                >
                  Add Entry
                </button>
              )}
            </div>
          </>
        )}

        {isAdding && (
          <EntryForm onCancel={onCancel} onSubmit={onTimeEntrySubmit} />
        )}
      </header>
    </div>
  );
}

export default App;
