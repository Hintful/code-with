import * as React from 'react';
import { createEditor, Operation } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { InitStateObject } from './InitStateObject';
import io from 'socket.io-client';

const SERVER_PORT = 4000;
const socket = io(`http://localhost:${SERVER_PORT}`);

export interface SyncEditorProps {
  
}
 
const SyncEditor: React.SFC<SyncEditorProps> = () => {
  const editor = React.useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = React.useState([InitStateObject]);
  const [remoteChange, setRemoteChange] = React.useState(false);

  React.useEffect(() => {
    socket.on('new-remote-op', ({ ops }: { ops: string }) => {
      console.log("x");
      const parsed_ops = JSON.parse(ops);
      setRemoteChange(true);
      setValue(parsed_ops);
    })
  })
  return (  
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => {
        if (!remoteChange) {
          socket.emit("new-op", {
            ops: JSON.stringify(newValue)
          });
        }
        setValue(newValue as any);
        setRemoteChange(false);
      }}
    >
        <Editable />
    </Slate>
  );
}
 
export default SyncEditor;