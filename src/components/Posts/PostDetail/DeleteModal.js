import React from 'react'
import { Button, Modal, Icon, Header } from 'semantic-ui-react'

const DeleteModal = ({ open, handleAction, handleOnDelete }) => {

    return (
        <div>
            <Modal
                basic
                onClose={() => handleAction(false)}
                onOpen={() => handleAction(true)}
                open={open}
                size='small'
            >
                <Header icon>
                    <Icon name='file alternate' />
                    Delete Post
                </Header>
                <Modal.Content className="d-flex justify-content-center">
                    <h4>Are you sure you want to delete this post</h4>
                </Modal.Content>
                <Modal.Actions className="d-flex justify-content-center">
                    <Button basic color='red' inverted onClick={() => handleAction(false)}>
                        <Icon name='remove' /> No
                    </Button>
                    <Button color='green' inverted onClick={() => handleOnDelete()}>
                        <Icon name='checkmark' /> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default DeleteModal
