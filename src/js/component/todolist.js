import React, { useState, useEffect } from "react";

export function Todolist() {
	const [newTask, setNewTask] = useState("");
	const [tasks, setTasks] = useState([]);
	const [test, setTest] = useState("Marie");
	function handleChange(event) {
		setNewTask(event.target.value);
	}
	function handleEnter(event) {
		if (event.key == "Enter") {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/marie2289",
				{
					method: "PUT",
					body: JSON.stringify([
						...tasks,
						{
							label: newTask,
							done: false
						}
					]),
					headers: { "Content-Type": "application/json" }
				}
			).then(() => {
				fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/marie2289"
				)
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(todolist => {
						console.log(todolist);
						setTasks(todolist);
					})
					.catch(error => console.log(error));
			});
			setNewTask("");
		}
	}
	function handleDelete(index) {
		var filteredTasks = tasks.filter((task, i) => {
			// if(index!=i) {return true;} else{return false;}
			return index != i;
		});
		setTasks(filteredTasks);

		if (event.key == "delete") {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/marie2289",
				{
					method: "DELETE",
					body: JSON.stringify([
						...tasks,
						{
							label: tasks,
							done: false
						}
					]),
					headers: { "Content-Type": "application/json" }
				}
			);
		}

		useEffect(() => {
			fetch("https://assets.breatheco.de/apis/fake/todos/user/marie2289")
				.then(response => {
					if (!response.ok) {
						throw Error(response.statusText);
					}
					return response.json();
				})
				.then(todolist => {
					console.log(todolist);
					setTasks(todolist);
				})
				.catch(error => console.log(error));
		}, []);
	}

	return (
		<div className="container-fluid text-center">
			<h1>{"todos"}</h1>

			<div className="col-6 mb-2 m-auto">
				<input
					className="form-control "
					type="text"
					placeholder="add a task"
					onChange={handleChange}
					value={newTask}
					onKeyPress={handleEnter}
				/>

				<ul>
					{tasks.map((task, index) => {
						return (
							<div
								key={index}
								className=" d-flex justify-content-between p-2">
								<li>{task.label}</li>
								<i
									className="fas fa-trash"
									onClick={() => handleDelete(index)}
								/>
							</div>
						);
					})}
				</ul>
				<div>
					<small>{tasks.length + " task(s) left"}</small>
				</div>
			</div>
		</div>
	);
}
