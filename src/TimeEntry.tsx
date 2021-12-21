import React from "react";
import "./TimeEntry.css";
import { TimeEntryModel } from "../Types";
import { Clock, XCircle } from "react-bootstrap-icons";

function TimeEntry({
  timeEntry,
  onRemove,
  onStart,
  onStop,
}: {
  timeEntry: TimeEntryModel;
  onRemove: (entry: TimeEntryModel) => void;
  onStart: (entry: TimeEntryModel) => void;
  onStop: (entry: TimeEntryModel) => void;
}) {
  return (
    <div className="TimeEntry-wrapper">
      <div className="TimeEntry-primary-detail">
        <p className="TimeEntry-project-name">{timeEntry.project.name}</p>
        {timeEntry.note && <p className="TimeEntry-note">{timeEntry.note}</p>}
      </div>
      <div className="TimeEntry-secondary-detail">
        <span className="TimeEntry-time">0.00</span>
        {!timeEntry.isRunning && (
          <button
            className="TimeEntry-start-button"
            type="button"
            onClick={() => onStart(timeEntry)}
          >
            <div className="TimeEntry-button-layout">
              <Clock size="1.25em" />
              Start
            </div>
          </button>
        )}
        {timeEntry.isRunning && (
          <button
            className="TimeEntry-stop-button"
            type="button"
            onClick={() => onStop(timeEntry)}
          >
            <div className="TimeEntry-button-layout">
              <Clock color="white" size="1.25em" /> Stop
            </div>
          </button>
        )}
        <button
          className="TimeEntry-remove-button"
          type="button"
          onClick={() => onRemove(timeEntry)}
        >
          <XCircle size="2em" />
        </button>
      </div>
    </div>
  );
}

export default TimeEntry;
