import React, { Fragment, useState, useEffect } from 'react';

import Form from './components/form';
import Appointment from './components/Appointment';

function App() {
	// save appointments in local storage
	// local storage just save strings
	let initialAppointments = JSON.parse(localStorage.getItem('appointments'));
	if (!initialAppointments) {
		initialAppointments = [];
	}

	// appointments array
	const [appointments, saveAppointments] = useState(initialAppointments);

	// show how useEffect
	// executes when component is ready and when it changes
	useEffect(() => {
		// console.log("document ready or something happened with appointments");

		let initialAppointments = JSON.parse(localStorage.getItem('appointments'));

		if (initialAppointments) {
			localStorage.setItem('appointments', JSON.stringify(appointments));
		} else {
			localStorage.setItem('appointments', JSON.stringify([]));
		}
	}, [appointments]); //pass [] to execute just one time (dependencies), 
	//each time appointments change it will execute

	// take actual appointments and add new one
	const createAppointment = appointment => {
		saveAppointments([
			...appointments,
			appointment
		])
	}

	// delete appointment by id
	const deleteAppointment = id => {
		// get differents of id from appointments, we use !
		const newAppointments = appointments.filter(appointment => appointment.id !== id);
		saveAppointments(newAppointments);
	}

	// conditional message
	const title = appointments.length === 0 ? 'There are not appointments' : 'Manage your appointments';

	return (
		<Fragment>
			<h1>Patient Manager</h1>
			<div className="container">
				<div className="row">
					<div className="one-half column">
						<Form
							createAppointment={createAppointment}
						/>
					</div>

					<div className="one-half column">
						<h2>{title}</h2>
						{appointments.map(appointment => (
							<Appointment
								key={appointment.id}
								appointment={appointment}
								deleteAppointment={deleteAppointment}
							/>
						))}
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default App;
