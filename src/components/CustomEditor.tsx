import Editor, { type ContentEditableEvent, Toolbar } from "react-simple-wysiwyg";

type CustomEditorProps = {
  value: string;
  onChange: (event: ContentEditableEvent) => void;
};

export default function CustomEditor({ value, onChange }: CustomEditorProps) {
  return (
    <Editor
      containerProps={{
        style: { marginTop: "48px" },
      }}
      value={value}
      onChange={onChange}
    >
      <Toolbar></Toolbar>
    </Editor>
  );
}
