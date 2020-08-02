import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Form = ({createAppointment}) => {

	// create state of dates
	const [appointment, updateAppointment] = useState({
		pet: '',
		owner: '',
		date: '',
		hour: '',
		symptoms: ''
	});

	// create error state
	const [error, updateError] = useState(false);

	// executes each time the user writes on an input
	const updateState = e => {
		//get the name of the input
		// console.log(e.target.name);

		// get the value of the input
		// console.log(e.target.value);

		updateAppointment({
			//copy state and then set the value
			...appointment,
			[e.target.name]: e.target.value
		})
	}

	// extract values
	const { pet, owner, date, hour, symptoms } = appointment;

	//execute when Add button is pressed
	const submitAppointment = e => {
		// prevent submit
		e.preventDefault();

		// validate
		if (pet.trim() === '' || owner.trim() === '' || date.trim() === '' ||
			hour.trim() === '' || symptoms.trim() === '') {
			updateError(true);
			return;
		}

		// delete previous message
		updateError(false);

		// assign id
		// we neeed to install package -> npm i uuid
		appointment.id = uuidv4();
		console.log(appointment);

		// create appointment
		createAppointment(appointment);

		// restart form
		updateAppointment({
			pet: '',
			owner: '',
			date: '',
			hour: '',
			symptoms: ''
		})
	}

	return (
		<Fragment>
			<h2>Create date</h2>

			{error ? <p className="alerta-error">All fields are required</p> : null}

			<form
				onSubmit={submitAppointment}
			>
				<label>Pet Name</label>
				<input
					type="text"
					name="pet"
					className="u-full-width"
					placeholder="pet name"
					onChange={updateState}
					value={pet}
				/>

				<label>Owner Name</label>
				<input
					type="text"
					name="owner"
					className="u-full-width"
					placeholder="owner name"
					onChange={updateState}
					value={owner}
				/>

				<label>Date</label>
				<input
					type="date"
					name="date"
					className="u-full-width"
					onChange={updateState}
					value={date}
				/>

				<label>Hour</label>
				<input
					type="time"
					name="hour"
					className="u-full-width"
					onChange={updateState}
					value={hour}
				/>

				<label>Symptoms</label>
				<textarea
					className="u-full-width"
					name="symptoms"
					onChange={updateState}
					value={symptoms}
				></textarea>

				<button
					type="submit"
					className="u-full-width button-primary"
				>
					Add
				</button>
			</form>
		</Fragment>
	);
}

// Doc props (type checking)
Form.propTypes = {
	createAppointment: PropTypes.func.isRequired
}

export default Form;
