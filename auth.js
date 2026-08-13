import { supabase } from "./supabase-config.js";


// ثبت نام

export async function register(email,password){

const {data,error}=await supabase.auth.signUp({

email,
password

});


if(error){

alert(error.message);
return false;

}


alert("ثبت نام انجام شد. ایمیل خود را بررسی کنید.");

return true;

}





// ورود

export async function login(email,password){


const {data,error}=await supabase.auth.signInWithPassword({

email,
password

});


if(error){

alert(error.message);
return false;

}


window.location.href="index.html";

return true;


}






// خروج

export async function logout(){


await supabase.auth.signOut();


window.location.reload();


}






// گرفتن کاربر

export async function getUser(){


const {

data:{
session

}

}

=
await supabase.auth.getSession();



return session?.user || null;


}







// فراموشی رمز

export async function forgotPassword(email){


const {error}=

await supabase.auth.resetPasswordForEmail(
email,
{

redirectTo:
window.location.origin+"/reset.html"

}

);



if(error){

alert(error.message);

return false;

}



alert("لینک بازیابی ارسال شد.");

return true;


}







// تغییر رمز

export async function updatePassword(password){


const {error}=

await supabase.auth.updateUser({

password

});



if(error){

alert(error.message);

return false;

}


alert("رمز عبور تغییر کرد.");

window.location.href="login.html";


return true;


}
