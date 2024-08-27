import React from 'react';

const ContactUs = () => {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 rounded-3">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Contact Us</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Enter your full name" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input type="text" className="form-control" id="subject" placeholder="Enter the subject" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea className="form-control" id="message" rows="5" placeholder="Write your message" required></textarea>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                  <button type="submit" className="btn btn-primary btn-lg">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
