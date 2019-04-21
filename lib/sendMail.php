<?php
	$name = trim($_POST['name']);

	$email = trim($_POST['email']);

	if (function_exists('stripslashes')) {
		$message = stripslashes(trim($_POST['message']));
	} else {
		$message = trim($_POST['message']);
	}

	$emailTo = 'mike@nugent.dev';
	$subject = 'Contact Form Submission from ' . $name;
	$sendCopy = trim($_POST['sendCopy']);
	$body = "Name: $name \n\nEmail: $email \n\nMessage: $message";
	$headers = 'From: Form <'.$emailTo.'>' . "\r\n" . 'Reply-To: ' . $email;

    if (mail($emailTo, $subject, $body, $headers)) {
        mail($emailTo, $subject, $body, $headers);
    }

	return true;
?>