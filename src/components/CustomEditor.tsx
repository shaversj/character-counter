import Editor, { type ContentEditableEvent, Toolbar } from "react-simple-wysiwyg";

type CustomEditorProps = {
  data: string;
  onChange: (event: ContentEditableEvent) => void;
};

export default function CustomEditor({ data, onChange }: CustomEditorProps) {
  return (
    <Editor
      placeholder={"Start typing here… (or paste your text)"}
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
