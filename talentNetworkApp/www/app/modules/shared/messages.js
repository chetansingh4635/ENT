angular.module('talentNetworkApp')
  .value('messages',{
    login:{
    invalidLogin:"Invalid email or password",
    invalidEmail:"Email id does not exist",
    no_email: "Email id and Password does not match",
    loginSuccess: "Login Successfully",
    verifyEmail:"Email id verification is pending",
    fbSignup:"Please signup first to continue with facebook.",
    resetPassword :"Please check your email id to reset password!!"
    },
    resendMail:{
                alreadyActivated:"Account Already Verified!!",
                notActivated:"Please check your Email id  for verification!!"
               },
    registration: {
        Required: "*Required",
        InvalidEmailId: "Email address is not valid",
        email_already_taken:"Email you entered is already taken.",
        InvalidMobileNo:"Enter valid mobile number",
        PasswordNotMatched:"Confirm Password does not match with Password",
        PasswordMinimumLength:'Minimum 6 character required',
        registrationErrorToast : 'Please provide valid input.',
        registrationSuccessToast : 'Registered successfully'
    },
    forgotPassword: {
        Required: "*Required",
        error:"Email is not Registered.",
        success:"Reset password link is sent",
        InvalidEmailId: "Email address is not valid",
        InvalidMobileNo:"Enter valid mobile number",
        PasswordNotMatched:"Re-Password do not match with password",
        PasswordMinimumLength:'Minimum 6 character required',
        registrationErrorToast : 'Please provide valid input.',
        registrationSuccessToast : 'Registered successfully',
        Incorrectoldpassword:'Please Enter your valid old password!!'
    },
    sessionExpired: "Your session has expired please login again.",
    password_mismatch:"Confirm password doesn't match",
    required:'Please fill required fields',
    passwordChanged:'Your password has been changed successfully',
    post_saved: 'Post saved successfully.You can check uploaded post in my uploads!!',
    profile_pic_updated: 'Profile picture updated',
    ideaSaved: 'Thanks for your idea! we will not use it without your permission',
    eventSaved: 'Your Event has been saved successfully!! ',
    user_blocked: 'You are blocked by admin.'


  });
