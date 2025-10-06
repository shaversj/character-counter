import Editor, { type ContentEditableEvent, Toolbar } from "react-simple-wysiwyg";

type CustomEditorProps = {
  charLimitExceeded?: boolean;
  data: string;
  onChange: (event: ContentEditableEvent) => void;
};

export default function CustomEditor({ charLimitExceeded, data, onChange }: CustomEditorProps) {
  const isDark = document.documentElement.classList.contains("dark");

  return (
    <Editor
      containerProps={{
        style: {
          border: charLimitExceeded
            ? "1px solid #DA3701"
            : isDark
              ? "1px solid #E5E5EA"
              : "1px solid #3F3F46",
          borderRadius: "12px",
          boxShadow: charLimitExceeded ? "0px 0px 8px #DA3701" : "none",
          marginTop: "48px",
        },
      }}
      onChange={onChange}
      placeholder={"Start typing here… (or paste your text)"}
      value={data}
    >
      <Toolbar></Toolbar>
    </Editor>
  );
}
