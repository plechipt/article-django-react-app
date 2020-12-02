import React, { useState, useEffect } from 'react'
import { Button, Form, Message } from 'semantic-ui-react'
import { useHistory, useParams } from 'react-router-dom'
import { USER_PROFILE_INFO_MUTATION, USER_UPDATE_MUTATION, USER_DELETE_JWT_TOKENS_MUTATION } from '../Api/user'
import { useMutation } from '@apollo/react-hooks'

import ProfileImage from './ProfileImages'
import ProfileBodyButtons from './ProfileBodyButtons'
import './Profile.css'

const PATH_TO_PICTURES = 'media/profile_pictures'

const Profile = ({ currentUser }) => {
    const { user } = useParams()
    const history = useHistory()

    const [ getProfileInfo, { data: profileData }] = useMutation(USER_PROFILE_INFO_MUTATION)
    const [ updateProfile, { data: updateData }] = useMutation(USER_UPDATE_MUTATION)
    const [ deleteTokens ] = useMutation(USER_DELETE_JWT_TOKENS_MUTATION)

    const [ imageName, setImageName ] = useState()
    const [ errorMessages, setErrorMessages ] = useState()

    const [ usernameInput, setUsernameInput ] = useState('')
    const [ emailInput, setEmailInput ] = useState('')
    const [ profileImage, setProfileImage ] = useState('none')


    useEffect(() => {
        const getProfileInfoFunction = async () => {
            if (user) {
                await getProfileInfo({ variables: { user: user } })
            }
        }
        getProfileInfoFunction()
    }, [user, getProfileInfo])
    
    useEffect(() => {
        if (profileData && profileData.getProfileInfo.message === 'Success') {
            let imagePath = profileData.getProfileInfo.profile.image

            setUsernameInput(profileData.getProfileInfo.profile.user.username)
            setEmailInput(profileData.getProfileInfo.profile.user.email)
            setImageName(imagePath)
        }
    }, [profileData])

    // Set message to user (including error and success messages)
    useEffect(() => {
        if (updateData && updateData.updateProfile.message !== 'Success') {
            setErrorMessages(updateData.updateProfile.message)
        }
    }, [updateData])

    useEffect(() => {
        const updateProfile = async () => {
            if (updateData !== undefined && updateData.updateProfile.message === 'Success') {
                // Delete JWT tokens
                await deleteTokens()

                history.push('/login')
                window.location.reload(false) // Reset site
            }
        }
        updateProfile()
    }, [updateData, history])

    const handleOnSubmit = async (event) => {
        const user_pressed_enter = event.key === 'Enter'
        const user_submited_button = event.target.tagName === 'FORM'

        if (user_pressed_enter || user_submited_button) {
            await updateProfile({ variables: { 
                user: user, newUser: usernameInput,
                newEmail: emailInput, image: profileImage }
            })
        }
    }

    const onImageChange = (image) => {
        const user_has_picked_image = image !== ''
        
        if (user_has_picked_image) {
            setProfileImage(image)
        }
    }


    return (
        <div className="profile-container">
            {(profileData && imageName && profileData.getProfileInfo.message === 'Success') ?(
                <div>
                    {(errorMessages) ? (
                        <Message
                            className="error-message-container"
                            error
                            header='There was some errors with your submission'
                            list={[errorMessages]}
                        />
                    ) : null}
                    <div className="media profile-media">
                        <img 
                            className="rounded-circle profile-picture" 
                            src={require(`./${PATH_TO_PICTURES}/large/${profileData.getProfileInfo.profile.image}`)} 
                            alt="" 
                        />
                        <div className="profile-body">
                        {user === currentUser ? (
                            <>
                                <h2 className="account-heading">{profileData.getProfileInfo.profile.user.username}</h2>
                                <p className="text-secondary">{profileData.getProfileInfo.profile.user.email}</p>
                            </>
                        ) : (
                           <>
                                <h2 className="account-heading">{profileData.getProfileInfo.profile.user.username}</h2>
                           </> 
                        )}
                        </div>
                        <ProfileBodyButtons profileData={profileData} currentUser={currentUser} />
                    </div>
                    {(user === currentUser) ? (
                        <div className="form-group">
                            <p className="profile-info-text">Profile Info</p>
                            <hr className="mb-4" />
                            <Form onKeyPress={handleOnSubmit} onSubmit={handleOnSubmit}>
                                <Form.Field>
                                    <label>Username</label>
                                    <input 
                                        onChange={event => setUsernameInput(event.target.value)} 
                                        value={usernameInput} 
                                        placeholder='Username' 
                                        maxLength="39" 
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Email</label>
                                    <input 
                                        onChange={event => setEmailInput(event.target.value)} 
                                        value={emailInput} 
                                        placeholder='Email' 
                                        maxLength="49" 
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Image</label>
                                    {/*User can choose between images*/}
                                    <ProfileImage 
                                        userImage={profileData.getProfileInfo.profile.image} 
                                        onImageChange={onImageChange} 
                                    />
                                </Form.Field>
                                <Button className="submit-button" type='submit' primary>Update</Button>
                            </Form>
                        </div>
                    ) : null }
                </div>
            ) : null }
        </div>
    )
}

export default Profile
