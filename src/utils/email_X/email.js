const fs = require("fs");
const handlebars = require("handlebars");
const nodemailer = require("nodemailer");

const setupEmailService = () => {
  const options = {
    host: "smtp.sendgrid.net",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "apikey", // generated ethereal user
      pass: "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", // generated ethereal password
    },
  };
  const mailer = nodemailer.createTransport(options);
  mailer.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email service is ready.");
    }
  });
  return mailer;
};

const mailer = setupEmailService();

const readHTMLFile = (path, callback) => {
  fs.readFile(
    path,
    {
      encoding: "utf-8",
    },
    function (err, html) {
      if (err) {
        callback(err);
      } else {
        callback(null, html);
      }
    }
  );
};

const sendHtmlMail = ({
  data,
  from,
  to,
  subject,
  templateUrl,
  attachments,
}) => {
  return new Promise((resolve, reject) => {
    readHTMLFile(templateUrl, function (err, html) {
      handlebars.registerHelper("if_eq", function (a, b, opts) {
        if (a == b) {
          return opts.fn(this);
        } else {
          return opts.inverse(this);
        }
      });
      let template = handlebars.compile(html);
      let replacements = data;
      let htmlToSend = template(replacements);
      let msg = {
        from: from,
        to: to,
        subject: subject,
        html: htmlToSend,
        attachments,
      };

      console.log(`Sending email to: ${to}`);

      mailer.sendMail(msg, function (error, info) {
        if (error) {
          console.log("Error in Sending Mail", error);
        }
        return resolve("mail has been sent");
      });
    });
  });
};

module.exports = {
  sendHtmlMail,
};
