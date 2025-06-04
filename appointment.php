<?php
 if (isset($_POST['appointment'])) {
    $name=$_POST['name'];
    $email=$_POST['email'];
    $pwd=$_POST['pwd'];
    $cpwd=$_POST['cpwd'];
    $sql = $conn->prepare("INSERT INTO signup (name,email,pwd,cpwd) VALUES ('$name','$email','$pwd', '$cpwd')");
    $result = 
    $sql->execute();
    if ($result == TRUE) {
      header("location:../HappyFace/index.php");
      echo "<script>alert('Sign Up successfully.');</script>";
    }else{
      echo "<script>alert('Please Enter Valid Detail.');</script>";
    } 
    $conn = null; 
  } 
 ?>
<!DOCTYPE HTML>

<html>
	<head>
		<title>Appointment</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
		<link rel="stylesheet" href="assets/css/main.css" />
		<link rel="stylesheet" href="assets/css/toc.css">
		<noscript><link rel="stylesheet" href="assets/css/noscript.css" /></noscript>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		 <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/a076d05399.js"></script>
    <style type="text/css">
      .form-group
      {
        margin: 20px;
        font-size: 20px;
      }
      .container
      {
        border: 2px solid black;
      }
    </style>
	</head>
	<body class="left-sidebar is-preload">
		<div id="page-wrapper">

			<!-- Header -->
				<div id="header">

					<!-- Inner -->
						<div class="inner">
							<header>
								<h1><a href="index.php" id="logo">Appointment</a></h1>
							</header>
						</div>

					<!-- Nav -->
						<nav id="nav">
							<ul>
								<li><a href="index.php">Home</a></li>
								<li>
									<a href="HandD.php">Health And Diseases</a>
									<ul>
										<li>
											<a href="HandD.php"> Health</a>
											<ul>
												<li><a href="Happiness.php">Happiness</a></li>
												<li><a href="Meditation.php">Meditatition</a></li>
												<li><a href="Spirituallity.php">Spirituallity</a></li>
												<li><a href="Dancing.php">Dancing</a></li>
											</ul>
										</li>
										<li><a href="HandD.php">All Diseases A-Z</a></li>
									</ul>
								</li>
								<li><a href="appointment.php">Appointment</a></li>
								<li>
									<a href=".#">About Us</a>
									<ul>
										<li>
											<a href="aboutus/Doctors.php">Doctors</a>
										</li>
										<li><a href="aboutus/Devlopers.php">Devlopers</a></li>
									</ul>
								</li>
								<button type="button"class="btn btn-warning"><a href="../stress admin/cloginsignup.php">Login & Sign Up</a></button>
							</ul>
						</nav>

				</div>

			<!-- Main -->
				<div class="container">

      <form class="form-group">
        <h2 align="center">Please fill out all information, so that we may better server you.</h2>
        <div class="form-group">
          <label for="full name">Full Name</label>
          <input type="text" class="form-control" name="name" placeholder="Full Name" required autofocus autocomplete="on">
        </div>
        <div class="form-group">
          <label for="email">E-Mail</label>
          <input type="email" class="form-control" name="email" placeholder="E-Mail" required>
        </div>
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input type="text" class="form-control" name="phoneno" placeholder="Phone No." required>
        </div>
        <div class="form-group">
          <label for="age">Age:</label>
          <input type="text" class="form-control" name="age" placeholder="Age" min="1" max="110" required>
        </div>
        <div class="form-group">
          <label for="date">What day best for you?</label>
          <input type="date" class="form-control" name="date" required>
        </div>
        <div class="form-group">
          <label for="meet">Is this going to be your first visit, or are you already a patient of ours?</label>
          <select name="meet">
          	<option>Select One</option>
          	<option>It's my first Time</option>
          	<option>I've been here before</option>
          </select>
        </div>  
        <div class="form-group">
          <label for="via">What is the best way to reach you?</label><br>
          <select name="via">
          	<option>Select One</option>
          	<option>Phone,video call</option>
          	<option>Personal</option>
          </select>
        </div>  
        <div class="form-group">
          <label for="address">Address:</label>
          <input type="textarea" class="form-control" name="address" placeholder="Address" required>
        </div>
        <div class="form-group">
          <label for="problem">Can you briefly describe you're Problem?</label>
          <input type="textarea" class="form-control" name="problem" placeholder="Problem" required>
        </div>     
        <div class="form-group">
          <button class="btn btn-primary col-6" name="appointment" type="submit" style="margin-left: 250px;">Make appointment</button>
        </div>
      </form>

    </div> <!-- /container -->
<!-- Footer-->
<footer>
	<section class="contact">
  <header>

											<h3>Having Happy Face?</h3>
										</header>
										<p>Share Your Exprience</p>
										<ul class="icons">
											<li><a href="#" class="icon brands fa-twitter"><span class="label">Twitter</span></a></li>
											<li><a href="#" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a></li>
											<li><a href="#" class="icon brands fa-instagram"><span class="label">Instagram</span></a></li>
											<li><a href="#" class="icon brands fa-linkedin-in"><span class="label">Linkedin</span></a></li>
										</ul>
									</section>
									<div class="copyright">
										<ul class="menu">
											<li>&copy; HappyFace.Inc All rights reserved.</li>
										</ul>
									</div>
</footer>
<!-- bootstrap-->
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

		<!-- Scripts -->
			<script src="assets/js/jquery.min.js"></script>
			<script src="assets/js/jquery.dropotron.min.js"></script>
			<script src="assets/js/jquery.scrolly.min.js"></script>
			<script src="assets/js/jquery.scrollex.min.js"></script>
			<script src="assets/js/browser.min.js"></script>
			<script src="assets/js/breakpoints.min.js"></script>
			<script src="assets/js/util.js"></script>
			<script src="assets/js/main.js"></script>
		
	</body>
</html>