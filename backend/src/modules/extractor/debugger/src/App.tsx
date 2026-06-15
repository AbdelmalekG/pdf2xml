import { useState } from "react";

import { extract } from "./services/extract";

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

    const response = await extract(file);

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
          width: "250%",
        }}
      >
        <input
          type="file"
          onChange={(event) => setFile(event.target.files?.[0])}
        />

        <button onClick={debug}>Debug</button>

        <PageViewer pages={pages} highlightedId={highlightedId} />
      </div>

      <Sidebar pages={pages} onHover={setHighlightedId} />
    </div>
  );
}
