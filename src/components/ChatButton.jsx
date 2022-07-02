import React from "react";
import { Button, Dropdown, ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const ChatButton = ({ 
    channel, showModal, handleClick, 
}) => {
    const { id, name, removable} = channel;
    const currentChannelId = useSelector((state) => state.uiReducer);
    const variant = id === currentChannelId ? 'secondary' : '';

    return (
        removable ? 
            <Dropdown as={ButtonGroup} className="d-flex">
                <Button 
                variant={variant}
                className="rounded-0 w-100 text-start text truncate"
                onClick={handleClick(channel)}
                >
                    <span className="me-1">#</span>
                    {name}
                </Button>
                <Dropdown.Toggle split variant={variant} id="dropdawn-split-basic" className="flex-grow-0">
                    <span className="visualy-hidden">{'Управление каналом'}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => showModal('removing', channel)}>{'Remove'}</Dropdown.Item>;
                    <Dropdown.Item onClick={() => showModal('renaming', channel)}>{'Rename'}</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        
    : (
        <Button 
        variant={variant}
        className="w-100 rounded-0 text-start"
        onClick={handleClick(channel)}
        >
            <span className="m-1">#</span>
            {name}
        </Button>
    )
    )
}

export default ChatButton;