import * as React from 'react';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { InitStateObject } from './InitStateObject';

export interface SyncEditorProps {
  
}
 
const SyncEditor: React.SFC<SyncEditorProps> = () => {
  const editor = React.useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = React.useState([InitStateObject]);
  return (  
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => setValue(newValue as any)}>
        <Editable />
    </Slate>
  );
}
 
export default SyncEditor;