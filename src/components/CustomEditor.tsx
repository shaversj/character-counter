import Editor, { type ContentEditableEvent, Toolbar } from "react-simple-wysiwyg";

type CustomEditorProps = {
  data: string;
  onChange: (event: ContentEditableEvent) => void;
};

export default function CustomEditor({ data, onChange }: CustomEditorProps) {
  return (
    <Editor
      containerProps={{
        style: { marginTop: "48px" },
      }}
      value={data}
      onChange={onChange}
    >
      <Toolbar></Toolbar>
    </Editor>
  );
}
