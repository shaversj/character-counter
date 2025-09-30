import Editor, { type ContentEditableEvent, Toolbar } from "react-simple-wysiwyg";

type CustomEditorProps = {
  data: string;
  onChange: (event: ContentEditableEvent) => void;
  charLimitExceeded?: boolean;
};

// border: "1px solid #DA3701",
//   boxShadow: "0px 0px 8px #DA3701",
export default function CustomEditor({ data, onChange, charLimitExceeded }: CustomEditorProps) {
  console.log(charLimitExceeded);
  return (
    <Editor
      placeholder={"Start typing here… (or paste your text)"}
      containerProps={{
        style: {
          marginTop: "48px",
          border: charLimitExceeded ? "1px solid #DA3701" : "1px solid #E5E5EA",
          boxShadow: charLimitExceeded ? "0px 0px 8px #DA3701" : "none",
          background: "#F2F2F7",
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
// /* Text Input Container */
//
// box-sizing: border-box;
//
// /* Auto layout */
// display: flex;
// flex-direction: row;
// align-items: flex-start;
// padding: 20px;
// gap: 10px;
//
// width: 990px;
// height: 200px;
//
// background: #F2F2F7;
// border: 1px solid #DA3701;
// box-shadow: 0px 0px 8px #DA3701;
// border-radius: 12px;
//
// /* Inside auto layout */
// flex: none;
// order: 0;
// align-self: stretch;
// flex-grow: 0;
//
//
// /* Placeholder Text */
//
// width: 950px;
// height: 84px;
//
// /* text-preset-3 */
// font-family: 'DM Sans';
// font-style: normal;
// font-weight: 400;
// font-size: 20px;
// line-height: 140%;
// /* or 28px */
// letter-spacing: -0.6px;
//
// color: #2A2B37;
//
//
// /* Inside auto layout */
// flex: none;
// order: 0;
// flex-grow: 1;
