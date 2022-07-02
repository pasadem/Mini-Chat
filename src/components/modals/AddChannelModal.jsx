import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import {
    Modal, Button, FormGroup, FormControl, FormLabel
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useChatApi from '../../hooks/useChatApi.jsx';
import { min } from "lodash";

const AddChannelModal = ({ onHide }) => {
	const channels = useSelector((state) = Object.values(state.channelReducer.entities));
	const channelsNames = channels.map(channel => channel.name);

	const [inputValid, setInputValid] = useState(true);
	const [validationError, setValidationError] = useState('');

	const inputRef = useRef();

	const { addNewChannel } = useChatApi();

	const schema = yup.object({
			name: yup
				.string()
				.required('errors.requared')
				.min(3, 'minMax')
				.max(20, 'minMax')
				.notOneOf(channelsNames, 'exist')
	});

	const formik = useFormik({
		initialValues: {
			name: '',
		},
		onSubmit: async (values) => {
			try {
				await schema.validate(values);
				addNewChannel(values);
				formik.resetForm();
				onHide();			
			} catch (err) {
				const [message] = err.errors;
				setInputValid(false);
				setValidationError(message);
			}
		},
	});

	useEffect(() => {
		inputRef.current.select();
	}, []);

	return (
		<Modal
			show
			onHide={onHide}
			aria-labelledby="contained-modal-title-vcenter"
			centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">{'Title'}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={formik.handleSubmit}>
						<FormGroup>
							<FormLabel
								htmlFor="name"
								className="visually-hidden"
								>
									{'inputLable'}
							</FormLabel>
							<FormControl 
							className={inputValid ? 'mb-2' : 'mb-2 is-invalid'}
							ref={inputRef}
							onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              name="name"
              id="name"
            />
						{validationError ? <div className="text-danger">{validationError}</div> : null}
						</FormGroup>
						<div className="d-flex justify-content-end">
							<Button className="me-2" variant="secondary" onClick={onHide}>{'Cancel'}</Button>
							<Button type="submit" variant="primary">{t('submitBtn')}</Button>
						</div>
					</form>
				</Modal.Body>
			</Modal>
	)
};

export default AddChannelModal;
