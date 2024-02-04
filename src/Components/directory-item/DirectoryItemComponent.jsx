import React from "react";
import {
  DirectoryItemContainer,
  DirectoryBody,
  BackgroundImage,
} from "./directory-items.styles";
import { useNavigate } from "react-router-dom";

const DirectoryItem = ({ category }) => {
  const { id, title, imageUrl } = category;
  const changeLoc = useNavigate();

  return (
    <DirectoryItemContainer
      onClick={() => changeLoc(`/shop/${title}`)}
      key={id}
    >
      <BackgroundImage style={{ backgroundImage: `url(${imageUrl})` }} />
      <DirectoryBody>
        <h3>{title}</h3>
        <p>Shop Now</p>
      </DirectoryBody>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
