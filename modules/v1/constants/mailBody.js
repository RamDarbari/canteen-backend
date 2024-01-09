const mailBody = (data, type, email, generatedOTP) => {
  const body = {
    adminOrder: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <style>
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid #000; 
            padding: 8px;
            text-align: left;
          }
        </style>
      </head>
      <body>
        <div style="background-color: #f1f1f1; padding: 20px;">
        <h1 style="text-align: center; font-size: 24px;">Seasia Infotech</h1>
        <h1 style="text-align: center; font-size: 24px;">Hi ${email}</h1>
        <h2 style="text-align: center;color: rgb(76, 173, 76)">Order Placed Successfully</h2>
        <h2 style="text-align: center; color: #007BFF;">Your EmployeeId ${
          data?.emp_id
        }</h2>
        <p style="text65279d5bcf5fcc3eeb7ed19c-align: center;">Order Details</p>
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              ${data?.order_rec
                ?.map(
                  (item) => `
                    <tr>
                      <td>${item.item_name}</td>
                      <td>${item.quantity}</td>
                      <td>${item.price}</td>
                      <td>${item.totalPrice}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
          </table>
          <h1 style="text-align: center; font-size: 24px;">Your Total Amount Is : ${
            data?.totalBalance
          }</h1>
          <p style="text-align: center;">Thank you for Ordering.</p>
          <p style="text-align: center;">
          Your Seasia Team
          </p>
          <h6 style="text-align: center;">©Seasiainfotech</h6>
        </div>
   
      </body>
      </html>
    `,

    confirmOrder: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>order confirmation </title>
    </head>
    <body marginheight="0" topmargin="0" marginwidth="0" style=" background-color: #f2f3f8; margin: 0px; padding: 0px; text-align: center;">
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" align="center" style="margin: auto">
      <tbody>
      
        <tr>
          <td style="padding-top: 1rem; text-align: center; width: 100%">
            <table width="80%" cellpadding="0" cellspacing="0" style=" background: #fff; border-radius: 10px; text-align: center; -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06); -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06); box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06); margin: auto;">
              <tbody>
                <tr>
                  <td>
                    <table style="margin: 0px auto">
                      <tbody>
                        <tr>
                          <td style="text-align: center; padding-top: 1rem"></td>
                        </tr>
                        <tr>
                            <td class="x_pad">
                              <div align="center" class="x_alignment" style="line-height: 5px">
                                <img src=" https://seasia.prodacker.com/static/media/logo-new.4a5f48de786a28690944e35048da410a.svg" alt="Your Logo" title="Your Logo" width="136" />
                              </div>
                            </td>
                          </tr>
                     
                        <tr>
                          <td class="x_pad" style="padding-bottom: 15px; padding-left: 15px; padding-right: 15px; padding-top: 0px;">
                            <div style="font-family: sans-serif, serif, EmojiFont">
                              <div class="" style="font-size: 14px; color: rgb(29, 167, 255); line-height: 1.5; font-family: sans-serif, serif, EmojiFont;">
                                <p style="margin: 0; font-size: 16px; text-align: center; font-weight: 400;">
                                  Dear<span style="font-size: 16px; font-weight: 600">
                                    ${data?.fullName}</span>
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                        
                          <tr>
                            <td style="opacity: 1; color: rgb(76, 173, 76); font-size: 20px; font-weight: 700; font-style: normal; letter-spacing: 0px; text-align: center;">
                            Your Order is Confirmed    
                            <p style="text-align: center; color: #007BFF;">Your EmployeeId ${
                              data?.emp_id
                            }</p>        
                              <p style="text-align: center;">Order Details</p>             
                        </tr>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <div align="center" class="x_alignment">
                                <table style="border-collapse: collapse; width: 100%; margin-top: 20px;">
                                    <thead>
                                      <tr style="background-color: #f2f2f2;">
                                        <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;">Item Name</th>
                                        <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;">Quantity</th>
                                        <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;">Price</th>
                                        <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;">Total Price</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      ${data?.order_rec
                                        ?.map(
                                          (item, index) => `
                                            <tr style="background-color: ${
                                              index % 2 === 0
                                                ? "#ffffff"
                                                : "#f9f9f9"
                                            };">
                                              <td style="border: 1px solid #dddddd; text-align:center; padding: 8px;">${
                                                item.item_name
                                              }</td>
                                              <td style="border: 1px solid #dddddd; text-align:center; padding: 8px;">${
                                                item.quantity
                                              }</td>
                                              <td style="border: 1px solid #dddddd; text-align:center; padding: 8px;">${
                                                item.price
                                              }</td>
                                              <td style="border: 1px solid #dddddd; text-align:center; padding: 8px;">${
                                                item.totalPrice
                                              }</td>
                                            </tr>
                                          `
                                        )
                                        .join("")}
                                    </tbody>
                                  </table>
                                  
                            </div>
                          </td>
                        </tr>
                       
                        <tr>
                          <td class="x_pad" style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px; padding-top: 5px;">
                            <div style="color: rgb(33, 33, 33); direction: ltr; font-family: sans-serif, serif, EmojiFont; font-size: 14px; font-weight: 400; letter-spacing: 0px; line-height: 150%; text-align: center;">
                            <p style="text-align: center; font-size: 24px;">Your Total Amount Is : ${
                              data?.totalBalance
                            }</p>
                   
                              <p style="margin: 0">
                                Thank you for choosing our service.
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style="opacity: 1; padding-top: 1rem; padding-bottom: 1rem; color: rgba(20, 15, 38, 1); font-size: 12px; font-weight: 400; font-style: normal; letter-spacing: 0px; text-align: center; line-height: 24px;">
                            If you didn’t make this request, ignore this email.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="text-align: center; font-size: 12px; padding: 10px">
            ©Seasiainfotech
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`,

    rejectOrder: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>order cancelled </title>
  </head>
  <body marginheight="0" topmargin="0" marginwidth="0" style="background-color: #f2f3f8; margin: 0px; padding: 0px; text-align: center;">
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" align="center" style="margin: auto">
      <tbody>
      
        <tr>
          <td style="padding-top: 1rem; text-align: center; width: 100%">
            <table width="80%" cellpadding="0" cellspacing="0" style="background: #fff; border-radius: 10px; text-align: center; -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06); -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06); box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06); margin: auto;">
              <tbody>
                <tr>
                  <td>
                    <table style="margin: 0px auto">
                      <tbody>
                        <tr>
                          <td style="text-align: center; padding-top: 1rem"></td>
                        </tr>
                        <tr>
                            <td class="x_pad">
                              <div align="center" class="x_alignment" style="line-height: 5px">
                                <img src=" https://seasia.prodacker.com/static/media/logo-new.4a5f48de786a28690944e35048da410a.svg" alt="Your Logo" title="Your Logo" width="136"/>
                              </div>
                            </td>
                          </tr>
                     
                        <tr>
                          <td class="x_pad" style="padding-bottom: 15px; padding-left: 15px; padding-right: 15px; padding-top: 0px;">
                            <div style="font-family: sans-serif, serif, EmojiFont">
                              <div class="" style="font-size: 14px; color: rgb(29, 167, 255); line-height: 1.5; font-family: sans-serif, serif, EmojiFont;">
                                <p style="margin: 0; font-size: 16px; text-align: center; font-weight: 400;">
                                  Dear<span style="font-size: 16px; font-weight: 600">
                                    ${data?.fullName}</span>
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>  
                  
                          <tr>
                            <td style="opacity: 1; color:  rgb(194, 44, 10); font-size: 20px; font-weight: 700; font-style: normal; letter-spacing: 0px; text-align: center;">
                           Your Order has been cancelled  
                            <p style="text-align: center; color: #007BFF;">Your EmployeeId ${
                              data?.emp_id
                            }</p>        
                              <p style="text-align: center;">Order Details</p>             
                        </tr>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <div align="center" class="x_alignment">
                                <table style="border-collapse: collapse; width: 100%; margin-top: 20px;">
                                    <thead>
                                      <tr style="background-color: #f2f2f2;">
                                        <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;">Item Name</th>
                                        <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;">Quantity</th>
                                        <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;">Price</th>
                                        <th style="border: 1px solid #dddddd; text-align: center; padding: 8px;">Total Price</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      ${data?.order_rec
                                        ?.map(
                                          (item, index) => `
                                            <tr style="background-color: ${
                                              index % 2 === 0
                                                ? "#ffffff"
                                                : "#f9f9f9"
                                            };">
                                              <td style="border: 1px solid #dddddd; text-align:center; padding: 8px;">${
                                                item.item_name
                                              }</td>
                                              <td style="border: 1px solid #dddddd; text-align:center; padding: 8px;">${
                                                item.quantity
                                              }</td>
                                              <td style="border: 1px solid #dddddd; text-align:center; padding: 8px;">${
                                                item.price
                                              }</td>
                                              <td style="border: 1px solid #dddddd; text-align:center; padding: 8px;">${
                                                item.totalPrice
                                              }</td>
                                            </tr>
                                          `
                                        )
                                        .join("")}
                                    </tbody>
                                  </table>
                                  
                            </div>
                          </td>
                        </tr>
                       
                        <tr>
                          <td class="x_pad" style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px; padding-top: 5px;">
                            <div style="color: rgb(33, 33, 33); direction: ltr; font-family: sans-serif, serif, EmojiFont; font-size: 14px; font-weight: 400; letter-spacing: 0px; line-height: 150%; text-align: center;">
                            <p style="text-align: center; font-size: 24px;">Your Total Amount Is : ${
                              data?.totalBalance
                            }</p>
                   
                              <p style="margin: 0">
                                Thank you for choosing our service.
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style=" opacity: 1; padding-top: 1rem; padding-bottom: 1rem; color: rgba(20, 15, 38, 1); font-size: 12px; font-weight: 400; font-style: normal; letter-spacing: 0px; text-align: center; line-height: 24px;">
                            If you didn’t make this request, ignore this email.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="text-align: center; font-size: 12px; padding: 10px">
            ©Seasiainfotech
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`,

    sendOtp: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
  </head>
  <body marginheight="0" topmargin="0" marginwidth="0" style="background-color: #f2f3f8; margin: 0px; padding: 0px; text-align: center;">
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" align="center" style="margin: auto">
      <tbody>
      
        <tr>
          <td style="padding-top: 1rem; text-align: center; width: 100%">
            <table width="80%" cellpadding="0" cellspacing="0" style="background: #fff; border-radius: 10px; text-align: center; -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06); -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06); box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06); margin: auto;">
              <tbody>
                <tr>
                  <td>
                    <table style="margin: 0px auto">
                      <tbody>
                        <tr>
                          <td style="text-align: center; padding-top: 1rem"></td>
                        </tr>
                        <tr>
                            <td class="x_pad">
                              <div align="center" class="x_alignment" style="line-height: 10px">
                                <img src=" https://seasia.prodacker.com/static/media/logo-new.4a5f48de786a28690944e35048da410a.svg" alt="Your Logo" title="Your Logo" width="136"/>
                              </div>
                            </td>
                          </tr>
                        <tr>
                          <td style="opacity: 1; color: rgba(20, 15, 38, 1); font-size: 20px; font-weight: 700; font-style: normal; letter-spacing: 0px; text-align: center; padding-top: 1rem; padding-bottom: 1rem;">
                            Email verification
                          </td>
                        </tr>
                        <tr>
                          <td class="x_pad" style="padding-bottom: 15px; padding-left: 15px; padding-right: 15px; padding-top: 0px;">
                            <div style="font-family: sans-serif, serif, EmojiFont">
                              <div class="" style="font-size: 14px; color: rgb(29, 167, 255); line-height: 1.5; font-family: sans-serif, serif, EmojiFont;">
                                <p style="margin: 0; font-size: 16px; text-align: center; font-weight: 400;">
                                  Dear<span style="font-size: 16px; font-weight: 600">
                                    ${email}</span>
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="x_pad" style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px; padding-top: 0px;">
                            <div style="color: rgb(33, 33, 33); direction: ltr; font-family: sans-serif, serif, EmojiFont; font-size: 14px; font-weight: 400; letter-spacing: 0px; line-height: 150%; text-align: center;">
                              <p style="margin: 0">Thank you for requesting to Email verification .
                                <br/>
                                Please use the following OTP to get your Email verification :
                              </p>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <div align="center" class="x_alignment">
                              <span style="text-decoration: none; color: rgb(0, 0, 0); background-color: transparent; border-radius: 4px; width: auto; border-width: 1px; border-style: solid; border-color: rgb(97, 97, 97); font-weight: 700; padding: 5px 30px; font-family: sans-serif, serif, EmojiFont; text-align: center; word-break: keep-all; font-size: 18px; display: inline-block; letter-spacing: normal;"><span dir="ltr" style="word-break: break-word; line-height: 32px;">${generatedOTP}</span></span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="x_pad" style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px; padding-top: 5px;">
                            <div style="color: rgb(33, 33, 33); direction: ltr; font-family: sans-serif, serif, EmojiFont; font-size: 14px; font-weight: 400; letter-spacing: 0px; line-height: 150%; text-align: center; margin-bottom: 40px;">
                              <p style="margin: 0">
                                The OTP valid for the next 5 minutes only.
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="x_pad" style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px; padding-top: 5px;">
                            <div style="color: rgb(33, 33, 33); direction: ltr; font-family: sans-serif, serif, EmojiFont; font-size: 14px; font-weight: 400; letter-spacing: 0px; line-height: 150%; text-align: center;">
                              <p style="margin: 0">
                                Thank you for choosing our service.
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style="opacity: 1; padding-top: 1rem; padding-bottom: 1rem; color: rgba(20, 15, 38, 1); font-size: 12px; font-weight: 400; font-style: normal; letter-spacing: 0px; text-align: center; line-height: 24px;">
                            If you didn’t make this request, ignore this email.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="text-align: center; font-size: 12px; padding: 10px">
            ©Seasiainfotech
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`,
  };

  return body[type];
};

module.exports = mailBody;
