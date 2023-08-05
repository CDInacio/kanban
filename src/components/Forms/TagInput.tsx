// import { useState } from "react";

// interface TagInputProps {
//   onAddTag: (tag: string) => void;
// }

// const TagInput = () => {
//   const [tag, setTag] = useState<string>("");
//   const [tags, setTags] = useState<string[]>([]);

//   const handleAddTag = () => {
//     if (tag.trim() !== "") {
//       setTags((prevTags) => [...prevTags, tag.trim()]);
//       setTag("");
//     }
//   };

//   return (
//     <div>
//       <div>
//         <input
//           type="text"
//           value={tag}
//           onChange={(e) => setTag(e.target.value)}
//           placeholder="Digite uma tag"
//         />
//         <button onClick={handleAddTag}>Adicionar</button>
//       </div>
//       {tags.map((tag, index) => (
//         <span key={index} style={{ marginRight: "5px" }}>
//           {tag}
//         </span>
//       ))}
//       <input type="hidden" name="tags" value={tags.join(",")} />
//     </div>
//   );
// };

// export default TagInput;
