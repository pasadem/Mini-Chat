

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    ButtonGroup,
    Col,
    Dropdown,
    Nav,
  } from 'react-bootstrap';

import { removeChannel, fetchChannels, selectors } from '../slices/channelsSlice.js';

const Channels = () => {
  const dispatch = useDispatch();
  const { channels } = useSelector(state => state.channels);


  useEffect(() => {
    dispatch(fetchChannels());
  }, []);

  const handleRemoveTask = (id) => {
    dispatch(removeTask(id));
  };
    return (
      <>
        <Col className="col-4 col-md-2 border-end pt-5 px-0">
        <div className="d-flex justify-content-between mb-2 ps-4 pe-2 align-text-bottom">
            <h5>{'Channels'}</h5>
            <Button
            type="button"
            size="sm"
            variant="outline-primary"
            className="border"
            >
            +
            </Button>
        </div>
        <div>
            <Nav fill as="ul" variant="pills" className="flex-column px-2">
            {channels.map(({ id, channel }) => {
                <li key={id}>
                    {channel}
                </li>
            })}
            </Nav>
        </div>
        </Col>
        </>
    );
    };

export default Channels;