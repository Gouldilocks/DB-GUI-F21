// ENTER YOUR EC2 PUBLIC IP/URL HERE
const ec2_url = 'ec2-18-220-1-169.us-east-2.compute.amazonaws.com'
// CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
const ec2 = true;
// USE localhost OR ec2_url ACCORDING TO ENVIRONMENT
export const url = ec2 ? ec2_url : 'localhost';