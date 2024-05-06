import nodemailer from 'nodemailer'


const welcomeMailFormate = (token) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Site</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f7f7f7;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .logo {
            text-align: center;
            margin-bottom: 20px;
        }
        .logo img {
            width: 150px;
            height: auto;
            border-radius: 20rem;
        }
        h1 {
            color: #333333;
            text-align: center;
            margin-bottom: 30px;
        }
        p {
            color: #666666;
            margin-bottom: 20px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
    </head>
    <body>
    <div class="container">
        <div class="logo">
            <img src="https://source.unsplash.com/featured/150x150/?developer" alt="Logo">
        </div>
        <h1>Welcome to Our Site</h1>
        <p>Hello,</p>
        <p>Thank you for joining our community! To complete your registration, please verify your email address by clicking the button below:</p>
        <p><a class="button" href="http://localhost:3000/verify-email?code=${token}">Verify Email Address</a></p>
        <p>If you did not sign up for an account, please ignore this email.</p>
        <p>Best regards,<br>Our Site Team</p>
    </div>
    </body>
    </html>`
}

export async function nodemailerConfiguration() {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });
}

export async function welcomeEmail(email, token) {
    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const info = await transporter.sendMail({
            from: `"Parth Kathiriya 👻" ${process.env.EMAIL}`,
            to: email,
            subject: "Welcome to our site.",
            html: welcomeMailFormate(token),
        });

        console.log("- Email sent successfully".green);
        return info
    } catch (error) {
        throw new Error(error);
    }
}