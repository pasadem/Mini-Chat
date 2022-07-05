import React from "react";
import { Button, Dropdown, ButtonGroup } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

function ChannelButton ({ 
    channel, isActive, handleSelect, handleRename, handleDelete  
}) {
    const { name, removable} = channel;
    const { t } = useTranslation();
    console.log(channel)
    return (
      removable ? (
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button 
          variant={isActive ? 'secondary' : 'light'}
          className="rounded-0 w-100 text-start text truncate"
          onClick={handleSelect}
          >
              <span className="me-1">#</span>
              {name}
          </Button>
          <Dropdown.Toggle
            split 
            variant={isActive ? 'secondary' : 'light'} 
            id="dropdawn-split-basic" 
            className="flex-grow-0">
              <span className="visualy-hidden"></span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleRename}>
              {t('rename')}
            </Dropdown.Item>
            <Dropdown.Item onClick={handleDelete}>
              {t('delete')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        )
    : (
        <Button 
        variant={isActive ? 'secondary' : 'light'}
        className="w-100 rounded-0 text-start"
        onClick={handleSelect}
        >
            <span className="m-1">#</span>
            {name}
        </Button>
    )
  )
}

export default ChannelButton;