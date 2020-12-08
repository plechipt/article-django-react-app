import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
let profileImages = [
  "default.jpg",
  "christian.jpg",
  "daniel.jpg",
  "elliot.jpg",
  "jenny.jpg",
  "joe.jpg",
  "steve.jpg",
  "stevie.jpg",
];

const PATH_TO_PICTURES = "media/profile_pictures";

const ProfileImages = ({ userImage, onImageChange }) => {
  const [chosenImage, setChosenImage] = useState("");

  // Will not show user image
  profileImages = profileImages.filter((image) => {
    return image !== userImage;
  });

  useEffect(() => {
    onImageChange(chosenImage);
  }, [chosenImage, onImageChange]);

  return (
    <div>
      <Card.Group itemsPerRow={10} className="profile-update-images">
        {profileImages.map((image) => {
          if (chosenImage === image) {
            return (
              <Card
                key={uuidv4()}
                className="profile-clicked-update-image"
                onClick={() => setChosenImage(image)}
                raised
                image={require(`./${PATH_TO_PICTURES}/large/${image}`)}
              />
            );
          } else {
            return (
              <Card
                key={uuidv4()}
                className="profile-update-image"
                onClick={() => setChosenImage(image)}
                raised
                image={require(`./${PATH_TO_PICTURES}/large/${image}`)}
              />
            );
          }
        })}
      </Card.Group>
    </div>
  );
};

export default ProfileImages;
