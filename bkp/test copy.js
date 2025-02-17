function doGet(e) {
  return handleResponse(e);
}

function doPost(e) {
  return handleResponse(e);
}

function handleResponse(e) {
  var ss = SpreadsheetApp.openById("1l-e5huYEg8-p1r7GuswnVax7hc7Onc_o3nv2iOCEzxs");
  var sheet = ss.getSheetByName("User details via Website");

  // Get the data from the form submission
  var name = e.parameter.name;
  var phone = e.parameter.phone;
  var email = e.parameter.email;
  var message = e.parameter.message;

  // Append the data to the spreadsheet
  sheet.appendRow([name, phone, email, message, new Date()]);

  // Return a success message (optional)
  return ContentService
    .createTextOutput(JSON.stringify({"result":"success", "name":name}))
    .setMimeType(ContentService.MimeType.JSON);
}
function sendWelcomeEmail(customerName, customerEmail) {
  const emailSubject = `Welcome to Cenovia International, ${customerName}!`;
  const emailBody = `
    Dear ${customerName},

    Thank you for reaching out to Cenovia International! We're excited to connect with you.

    We specialize in premium sports apparel manufacturing and exports, delivering excellence in athletic wear across global markets. Our commitment to quality and innovation sets us apart in the industry.

    Stay connected with us:
    • Website: https://cenoviainternational.com
    • LinkedIn: https://www.linkedin.com/company/cenovia-international/
    • Instagram: https://instagram.com/cenovia_international
    • Facebook: https://www.facebook.com/CenoviaInternational
    • X: https://x.com/CenoviaInterNat

    Our team will review your inquiry and get back to you shortly.

    Best Regards,
    Team Cenovia International
    📞 +91 6360817265
    📍 Bangalore, India
  `;

  MailApp.sendEmail({
    to: customerEmail,
    subject: emailSubject,
    body: emailBody
  });
}

// test function

function handleResponse(e) {
  var ss = SpreadsheetApp.openById("1l-e5huYEg8-p1r7GuswnVax7hc7Onc_o3nv2iOCEzxs");
  var sheet = ss.getSheetByName("User details via Website");
  var logSheet = ss.getSheetByName("Email Logs") || ss.insertSheet("Email Logs");

  // Get the data from the form submission
  var name = e.parameter.name;
  var phone = e.parameter.phone;
  var email = e.parameter.email;
  var message = e.parameter.message;

  // Append the data to the spreadsheet
  sheet.appendRow([name, phone, email, message, new Date()]);

  try {
    // Call sendWelcomeEmail with matching parameter names
    sendWelcomeEmail(name, email);
    
    // Log successful email
    logSheet.appendRow([
      new Date(), 
      email, 
      "SUCCESS", 
      "Welcome email sent"
    ]);
    
  } catch (error) {
    // Log failed email attempt
    logSheet.appendRow([
      new Date(), 
      email, 
      "FAILED", 
      error.toString()
    ]);
    
    Logger.log(`Email failed: ${error.toString()}`);
  }

  return ContentService
    .createTextOutput(JSON.stringify({"result":"success", "name":name}))
    .setMimeType(ContentService.MimeType.JSON);
}
function testEmailWithStaticData() {
  // Simulate form parameters
  const testData = {
    parameter: {
      name: "John",
      phone: "+91 9876543210",
      email: "praras5@gmail.com",  // Replace with your email
      message: "This is a test message from static data"
    }
  };

  // Call handleResponse with test data
  handleResponse(testData);
  
  Logger.log("Test execution completed");
}


https://script.google.com/macros/s/AKfycbx8wH_n2usm4V-5JJa71CykYDpKU57Ejl29J517FkLO7kjrBaRZn-NARJn399HH5fhO/exec

