import React, { useState } from "react";

export default function ControlPanel({ onSave }) {
  const [versionName, setVersionName] = useState("");
  const [versionNumber, setVersionNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);

    // Simulate sending to server
    setTimeout(() => {
      onSave({ versionName, versionNumber, notes });
      setVersionName("");
      setVersionNumber("");
      setNotes("");
      setSaving(false);
      alert("Release note saved!");
    }, 1000);
  };

  return (
    <div style={{ maxWidth: 600, margin: "30px auto", padding: 20, background: "#fff", borderRadius: 8, boxShadow: "0 0 8px #ccc" }}>
      <h2>Control Panel - Add Release Note</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label>
            Version Name:<br />
            <input
              type="text"
              value={versionName}
              onChange={(e) => setVersionName(e.target.value)}
              required
              style={{ width: "100%", padding: 8 }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>
            Version Number:<br />
            <input
              type="text"
              value={versionNumber}
              onChange={(e) => setVersionNumber(e.target.value)}
              required
              style={{ width: "100%", padding: 8 }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>
            Release Notes:<br />
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
              rows={5}
              style={{ width: "100%", padding: 8 }}
            />
          </label>
        </div>

        <button type="submit" disabled={saving} style={{ padding: "10px 20px", background: "#007acc", color: "white", border: "none", borderRadius: 4, cursor: saving ? "not-allowed" : "pointer" }}>
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
