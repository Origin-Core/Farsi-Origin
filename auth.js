import { supabase } from "./supabase-config.js";


let registerMode=false;



const title =
document.getElementById("title");


const button =
document.getElementById("submit");


const change =
document.getElementById("change");


const message =
document.getElementById("message");




change.onclick=()=>{


registerMode=!registerMode;


if(registerMode){

title.innerHTML="ثبت نام";

button.innerHTML="ایجاد حساب";

change.innerHTML="قبلاً حساب ساخته‌ام";


}

else{


title.innerHTML="ورود";

button.innerHTML="ورود";

change.innerHTML="ساخت حساب جدید";


}



}




button.onclick=async()=>{


message.innerHTML="در حال پردازش...";


const email=
document.getElementById("email").value.trim();


const password=
document.getElementById("password").value;



if(!email || !password){

message.innerHTML=
"ایمیل و رمز را وارد کنید";

return;

}



if(registerMode){



const {data,error}=

await supabase.auth.signUp({

email:email,

password:password

});



if(error){

message.innerHTML=
error.message;

return;

}



message.innerHTML=

"✅ ثبت نام انجام شد. ایمیل تایید را بررسی کنید";



}

else{



const {error}=

await supabase.auth.signInWithPassword({

email,

password

});



if(error){

message.innerHTML=
"ایمیل یا رمز اشتباه است";

return;

}



location.href="index.html";


}



};
