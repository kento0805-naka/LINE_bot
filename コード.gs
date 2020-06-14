function sendEmail(e) {

  var itemResponses = e.response.getItemResponses();
  var name = itemResponses[0].getResponse();
  var email = itemResponses[1].getResponse();
  var schedule = itemResponses[2].getResponse();

  var to = email;
  var subject = 'イベント申し込み確認メール';
  var body = '${name}様\n\n'.replace('${name}', name);
  
  body += 'この度はお申し込みいただきありがとうございます。\n';
  body += '以下の日程にてお申し込みを受け付けました。\n\n';
  body += '【日程】: ${schedule}'.replace('${schedule}', schedule);
  
  GmailApp.sendEmail(to, subject, body);
}


function notifyLINE(e) {

  var itemResponses = e.response.getItemResponses();
  var name = itemResponses[0].getResponse();
  var email = itemResponses[1].getResponse();
  var schedule = itemResponses[2].getResponse();
  
  var LINE_property = PropertiesService.getScriptProperties().getProperty('LINE_TOKEN');
  var user_id = PropertiesService.getScriptProperties().getProperty('USER_ID');
  
  const ACCESS_TOKEN = LINE_property;
  const USER_ID = user_id;
  
  var url = 'https://api.line.me/v2/bot/message/push';
  
  var headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer '+ ACCESS_TOKEN
  };
  
  var message = '【通知】\n\n';
  
  message += '下記日程に申し込みが入りました。\n\n';
  message += '${schedule}'.replace('${schedule}', schedule);
  
  var data = {
    to: USER_ID,
    messages: [{
      'type': 'text',
      'text': message
    }],
      
  };
  
  var options = {
    'method': 'post',
    'headers': headers,
    'payload': JSON.stringify(data)
  };
  
  UrlFetchApp.fetch(url, options);

}