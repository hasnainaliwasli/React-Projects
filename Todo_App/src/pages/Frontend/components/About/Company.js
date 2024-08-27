import React from 'react';

function About() {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col">
          <h2 className="text-center fw-bolder text-white pb-4">About This Todo App</h2>
          <div className="card p-4">
            <div className="card-body">
              <h5 className="card-title">Welcome to Your Todo App</h5>
              <p className="card-text">
                This Todo App is designed to help you manage your tasks efficiently and effectively. Whether you need to keep track of your daily chores, manage a project, or just jot down ideas, this app is here to assist you.
              </p>
              <h6>Key Features:</h6>
              <ul>
                <li><strong>Create Todos:</strong> Easily add new tasks with a title, description, and location.</li>
                <li><strong>Track Progress:</strong> Mark tasks as completed to keep track of your progress.</li>
                <li><strong>Organize Tasks:</strong> Sort and filter your tasks based on priority, due date, or status.</li>
                <li><strong>Edit Todos:</strong> Make changes to your tasks at any time, keeping your plans up-to-date.</li>
              </ul>
              <p>
                This app is built using modern web technologies, including <strong>React.js</strong> for the front-end and <strong>Firebase</strong> for backend services. It aims to provide a seamless and responsive user experience across all devices.
              </p>
              <p>
                Whether you're a student, professional, or just someone looking to stay organized, this Todo App is the perfect tool to help you get things done.
              </p>
              <h6>Get Started:</h6>
              <p>
                Begin by creating your first todo! Simply head over to the <strong>Todos</strong> section and start adding tasks. You can always come back to this page to learn more about the features of this app.
              </p>
              <p className="text-muted">
                Built with 💙 by Hasnain Ali. Your productivity is our mission.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
