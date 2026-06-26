import { useState } from "react";

import { analyze } from "./services/analyze";

import { Sidebar } from "./components/Sidebar";

import { PageViewer } from "./components/PageViewer";

export default function App() {
  const [file, setFile] = useState<File>();

  const [pages, setPages] = useState<any[]>([]);

  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  async function debug() {
    if (!file) {
      return;
    }

    const response = await analyze(file);

    setPages(response.pages);
  }

  return (
    <div
      className="layout"
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          flex: 1,

          minWidth: 0,

          display: "flex",

          flexDirection: "column",
        }}
      >
        <input
          type="file"
          onChange={(event) => setFile(event.target.files?.[0])}
        />

        <button onClick={debug}>Debug</button>

        <PageViewer pages={pages} highlightedId={highlightedId} />
      </div>

      <div
        style={{
          width: 320,

          flexShrink: 0,
        }}
      >
        <Sidebar pages={pages} onHover={setHighlightedId} />
      </div>
    </div>
  );
}
