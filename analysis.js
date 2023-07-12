/*
 ** Analysis Example
 ** Sending dynamic notification
 **
 ** Send notifications using analysis. It's include example for Email, SMS and Push Notification to TagoRUN Users.
 ** In order for this example to work, you must create an action by variable and set to run this analysis.
 ** Once the action is triggered with your conditions, the data will be sent to this analysis.
 **
 ** How to use:
 ** To analysis works, you need to add a new policy in your account. Steps to add a new policy:
 **  1 - Click the button "Add Policy" at this url: https://admin.tago.io/am;
 **  2 - In the Target selector, select the Analysis with the field set as "ID" and choose your Analysis in the list;
 **  3 - Click the "Click to add a new permission" element and select "Device" with the rule "Access" with the field as "Any";
 **  4 - To save your new Policy, click the save button in the bottom right corner;
 */
const { Analysis, Utils, Services, Resources } = require('@tago-io/sdk');

async function init(context, scope) {
  if (!scope[0]) return context.log('This analysis must be triggered by an action.');

  context.debug('Analysis started');
  // Get the environment variables.
  const environment_variables = Utils.envToJson(context.environment);
  if (!environment_variables.account_token) return context.log('Missing "account_token" environment variable');
  else if (environment_variables.account_token.length !== 36) return context.log('Invalid "account_token" in the environment variable');

  // Get the device ID from the scope and retrieve device information.
  const device_id = scope[0].device;
  const device_info = await Resources.devices.info(device_id);

  // Get the device name and tags from the device.
  // [TAG KEY]    [TAG VALUE]
  // email        example@tago.io
  // phone        +1XXxxxxxxx
  // user_id      5f495ae55ff03d0028d39fc5
  //
  // This is just a generic example how to get this information. You can get data from a device, search in tags, or any other way of correlation you have.
  // For example, you can get the email directly from the user_id if it was specified:
  // const { email } = await account.run.userInfo(userID_tag.id);
  const device_name = device_info.name;
  const email_tag = device_info.tags.find(tag => tag.key === 'email');
  const phone_tag = device_info.tags.find(tag => tag.key === 'phone');
  const userID_tag = device_info.tags.find(tag => tag.key === 'user_id');

  // Instance the SMS and Email service usando the analysis token from the context.
  const email_service = new Services({ token: context.token }).email;
  const sms_service = new Services({ token: context.token }).sms;

  // Send the notifications and output the results to the analysis console.
  if (email_tag) {
    await email_service.send({
      to: email_tag.value,
      subject: 'Notification alert',
      message: `You received a notification for the device: ${device_name}. Variable: ${scope[0].variable}, Value: ${scope[0].value}`,
    }).then(context.log).catch(context.log);
  } else {
    context.log('Email not found for this device.');
  }

  if (phone_tag) {
    await sms_service.send({
      to: phone_tag.value,
      message: `You received a notification for the device: ${device_name}. Variable: ${scope[0].variable}, Value: ${scope[0].value}`,
    }).then(context.log).catch(context.log);
  } else {
    context.log('Phone number not found for this device.');
  }

  if (userID_tag) {
    await account.run.notificationCreate(userID_tag.value, {
      title: 'Notification Alert',
      message: `You received a notification for the device: ${device_name}. Variable: ${scope[0].variable}, Value: ${scope[0].value}`,
    }).then(context.log).catch(context.log);
  } else {
    context.log('User ID not found for this device.');
  }

  context.log('Script end.');
}

module.exports = new Analysis(init);
