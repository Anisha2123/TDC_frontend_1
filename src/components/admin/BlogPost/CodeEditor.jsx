import { useState } from 'react';
import Editor from '@monaco-editor/react';

export default function CodeEditor({ value, onChange }) {
  const [language, setLanguage] = useState('javascript');

  return (
    <div className="space-y-2">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
      </select>
      <Editor
        height="200px"
        language={language}
        value={value}
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false }
        }}
      />
    </div>
  );
} 