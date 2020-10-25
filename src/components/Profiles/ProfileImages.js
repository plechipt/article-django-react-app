import React, { useState, useEffect } from 'react'
import { Card } from 'semantic-ui-react'

let profileImages = [
    'default.jpg', 'christian.jpg', 'daniel.jpg', 'elliot.jpg',
    'jenny.jpg', 'joe.jpg', 'steve.jpg', 'stevie.jpg'
]

const PATH_TO_PICTURES = 'media/profile_pictures'

const ProfileImages = ({ userImage, onImageChange }) => {
    //Image that user clicked as new profile image
    const [ chosenImage, setChosenImage ] = useState('')

    //Will not show user image
    profileImages = profileImages.filter(image => {
        return image !== userImage
    })

    useEffect(() => {
        onImageChange(chosenImage)
    }, [chosenImage])

    return (
        <div>
            <Card.Group itemsPerRow={10} className="profile-update-images">
                {profileImages.map(image => {
                    if (chosenImage === image) {
                        return(
                            <Card
                                className="profile-clicked-update-image"
                                onClick={() => setChosenImage(image)}
                                raised
                                image={require(`./${PATH_TO_PICTURES}/large/${image}`)} 
                            />                          
                        )
                    }
                    else {
                        return (
                            <Card
                                className="profile-update-image"
                                onClick={() => setChosenImage(image)}
                                raised
                                image={require(`./${PATH_TO_PICTURES}/large/${image}`)} 
                            />
                        )
                    }
                })}
            </Card.Group>
        </div>
    )
}

export default ProfileImages
