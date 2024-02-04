import DirectoryItem from "../directory-item/DirectoryItemComponent";
import "./directory.styles.scss";
//bracket inside the parameter is directly injecting a prop
const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((category) => {
        return <DirectoryItem category={category} key={category.id} />;
      })}
    </div>
  );
};

export default Directory;
