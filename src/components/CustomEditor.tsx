import Editor, { type ContentEditableEvent, Toolbar } from "react-simple-wysiwyg";

type CustomEditorProps = {
  data: string;
  onChange: (event: ContentEditableEvent) => void;
  charLimitExceeded?: boolean;
};

export default function CustomEditor({ data, onChange, charLimitExceeded }: CustomEditorProps) {
  return (
    <Editor
      placeholder={"Start typing here… (or paste your text)"}
      containerProps={{
        style: {
          marginTop: "48px",
          border: charLimitExceeded ? "1px solid #DA3701" : "1px solid #E5E5EA",
          boxShadow: charLimitExceeded ? "0px 0px 8px #DA3701" : "none",
          borderRadius: "12px",
        },
      }}
      value={data}
      onChange={onChange}
    >
      <Toolbar></Toolbar>
    </Editor>
  );
}
