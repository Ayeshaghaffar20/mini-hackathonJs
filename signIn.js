import { getAuth, signInWithEmailAndPassword, getDoc, where, query, doc, db } from "./firebase.js"


const auth = getAuth();

const signInBtn = document.getElementById('signInBtn')

let tryLogin;

signInBtn.addEventListener('click', async () => {
    const loginEmail = document.getElementById('loginEmail')
    const loginPassword = document.getElementById('loginPassword')

    if (loginEmail === "" || loginPassword === "") {
        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Oops",
            text: "Please fill all required fields!",
            confirmButtonText: "OK"
            // timer: 1500
        });
        return;

    }


    try {
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail.value.trim(), loginPassword.value.trim())



            .then((userCredential) => {
                tryLogin = userCredential.user

                console.log(userCredential);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    text: "You have successfully logged in!",
                    confirmButtonText: "OK"
                    // timer: 1500

                })

                    .then(() => {
                        setTimeout(() => {
                            loginEmail.value = ""
                            loginPassword.value = ""
                            location.href = "profile.html"
                        }, 0);

                    })


            })


        localStorage.setItem("authId", tryLogin.uid)
        console.log("done");







    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);



    }


})