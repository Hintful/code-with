import React, { useEffect, useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

function App() {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }]
    }
  ]);
  return (
    <div className="App">
      <Slate
        editor={editor}
        value={value}
        onChange={newValue => setValue(newValue as any)}>
          <Editable />
      </Slate>
    </div>
  );
}

export default App;
