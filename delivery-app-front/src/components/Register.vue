<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />

        <label for="username"><b>Username</b></label>
        <input
          ref="username"
          type="text"
          placeholder="Enter Username"
          name="username"
        />

        <label for="email"><b>Email</b></label>
        <input
          ref="email"
          type="email"
          placeholder="Enter Email"
          name="email"
        />

        <label for="psw"><b>Password</b></label>
        <input
          ref="psw"
          type="password"
          placeholder="Enter Password"
          name="psw"
        />

        <label for="psw-repeat"><b>Repeat Password</b></label>
        <input
          type="password"
          placeholder="Repeat Password"
          name="psw-repeat"
        />

        <label>
          <input
            type="checkbox"
            checked="checked"
            name="remember"
            style="margin-bottom: 15px"
          />
          Remember me
        </label>

        <p>
          By creating an account you agree to our
          <a href="#" style="color: dodgerblue">Terms & Privacy</a>.
        </p>

        <div class="clearfix">
          <button type="button" class="cancelbtn">Cancel</button>
          <button type="submit" class="signupbtn">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
