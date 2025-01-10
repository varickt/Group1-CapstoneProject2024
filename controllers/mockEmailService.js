const mockSendResetEmail = (toEmail, subject, body) => {
    console.log(`Simulating sending email to: ${toEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${body}`);
  
    // Simulate successful email sending
    return Promise.resolve('Password recovery token successfully');
  };
  
  module.exports = mockSendResetEmail;