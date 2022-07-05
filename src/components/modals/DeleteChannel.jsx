import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import toastParams from '../toastParams.js';
import { useApi } from '../../hooks/index.js';
import channelsSlice from '../../slices/channelsSlice.js';

const DeleteChannel = ({ show, modalInfo: channel, hideModal }) => {
	const { t } = useTranslation();
	const api = useApi();
	const handleDelete = (id) => {
		api.deleteChannel({ id }, (err) => {
			if (err) {
				toast.error(t('errors.networkError'));
			}
			toast.success(t('notifications.channelDeleted'), {
        position: toast.POSITION.TOP_CENTER
      });
			hideModal();
		});
	};

  return (
    <Modal show={show}>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>{t('deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('confirmPrompt')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>{t('cancel')}</Button>
        <Button variant="danger" type="submit" onClick={() => handleDelete(channel.id)}>{t('delete')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteChannel;
