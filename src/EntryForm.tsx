import React, { useState, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";
import "./EntryForm.css";
import { ProjectModel, TimeEntryModel } from "../Types";
import projects from "./projects";

function EntryForm({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: (entry: TimeEntryModel) => void;
}) {
  const [timeEntry, setTimeEntry] = useState<TimeEntryModel | null>({
    id: uuidv4(),
    project: projects[0],
    note: "",
    isRunning: false,
  });

  const onTimeEntrySubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!timeEntry) return;

    const selectedProject = projects.find(
      (item) => item.id === timeEntry?.project.id
    ) as ProjectModel;

    const entry: TimeEntryModel = {
      ...timeEntry,
      project: selectedProject,
      isRunning: true,
    };

    onSubmit(entry);
  };

  const onProjectSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const project = projects.find((item) => item.id === +e.target.value);
    const entry = {
      ...timeEntry,
      project,
    } as TimeEntryModel;

    setTimeEntry(entry);
  };

  return (
    <form className="Entry-form" onSubmit={onTimeEntrySubmit}>
      <label htmlFor="project">
        <span className="label-text">Project</span>
        <div className="select">
          <select onChange={onProjectSelect} value={timeEntry?.project?.id}>
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
          value={timeEntry?.note}
          // TODO: Make notes are editable
        />
      </label>

      <div className="Entry-actions">
        <button className="Primary-button" type="submit">
          Start Timer
        </button>
        <button className="Reset-button" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EntryForm;
