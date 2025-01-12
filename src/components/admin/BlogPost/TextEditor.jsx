import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function TextEditor({ value, onChange }) {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'blockquote'],
      [{ 'color': [] }],
      ['clean']
    ],
  };

  return (
    <div className="text-editor-container">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        className="bg-white text-gray-900"
      />
      <style jsx>{`
        .text-editor-container :global(.ql-editor) {
          min-height: 200px;
          color: #111827;
        }
        .text-editor-container :global(.ql-editor p) {
          color: #111827;
        }
        .text-editor-container :global(.ql-container) {
          font-size: 1rem;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }
        .text-editor-container :global(.ql-toolbar) {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          background-color: #f9fafb;
        }
        .text-editor-container :global(.ql-editor.ql-blank::before) {
          color: #9CA3AF;
        }
      `}</style>
    </div>
  );
}

export default TextEditor; 