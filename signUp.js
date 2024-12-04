import { getAuth, createUserWithEmailAndPassword, doc, setDoc, db, serverTimestamp, collection } from "./firebase.js"

const auth = getAuth();

const cloudName = "dxogrvwp7";
const unsignedUploadPreset = "zljybyzf";

const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const userName = document.getElementById('userName')
const email = document.getElementById('email')
const signUpPass = document.getElementById('signUpPass')
const gender = document.getElementById('gender')
const phoneNo = document.getElementById('phoneNo')
const bio = document.getElementById('bio')
const signUpBtn = document.getElementById('signUpBtn')

signUpBtn.addEventListener('click', async (e) => {
    e.preventDefault()

    let userFirstName = firstName.value.trim()
    let userLastName = lastName.value.trim()
    let userEmail = email.value.trim()
    let userFullName = userName.value.trim()
    let userPassword = signUpPass.value.trim()
    // let userGender = gender.value
    let userBio = bio.value
    let userPhoneNo = phoneNo.value.trim()
    let front_image;


    if (userEmail === "" || userPassword === "" || userFullName === "") {
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

    else {
        console.log(userFirstName, userLastName, userEmail);
    }
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, userEmail, userPassword);



        try {
            const { resourceUrl, transformedUrl } = await uploadToCloudinary(
                profilePictureInput.files[0],
                cloudName,
                unsignedUploadPreset
            );
            // console.log("Resource URL:", resourceUrl);
            // console.log("Transformed URL:", transformedUrl);
            front_image = resourceUrl; // Set the front_image
            console.log("front_image", front_image);

        } catch (error) {
            console.error("Upload failed:", error);
        }

        try {

            console.log("try ");


            await setDoc(doc(db, "users", userCredential.user.uid), {
                fullName: userFirstName + " " + userLastName,
                username: userFullName,
                email: userEmail,
                gender: gender.value,
                phoneNo: userPhoneNo,
                bio: userBio,
                imageUrl: front_image,
                createdAt: serverTimestamp(),

            })

            console.log("working");


        } catch (error) {
            console.error("Error adding document with custom ID:", error);

        }


        Swal.fire("Success!", "Account created successfully", "success").then(() => {

            location.href = "signIn.html";

        })




    } catch (error) {
        let errorMessage = "Something went wrong. Please try again.";
        switch (error.code) {
            case "auth/email-already-in-use":
                errorMessage = "This email is already in use.";
                break;
            case "auth/invalid-email":
                errorMessage = "Invalid email format.";
                break;
            case "auth/weak-password":
                errorMessage = "Password is too weak.";
                break;
            case "auth/network-request-failed":
                errorMessage = "Network error.";
                break;
            default:
                errorMessage = error.message;

        }

        Swal.fire("Error", errorMessage, "error");


    }











})


// Drag-and-Drop Profile Picture
const dropZone = document.getElementById('dropZone');
const profilePictureInput = document.getElementById('profilePictureInput');

dropZone.addEventListener('click', () => {
    profilePictureInput.click();
});

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('border-blue-500');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('border-blue-500');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('border-blue-500');
    const files = e.dataTransfer.files;
    if (files.length && files[0].type.startsWith('image/')) {
        profilePictureInput.files = files;
        const fileName = files[0].name;
        dropZone.innerHTML = `<p>${fileName} selected</p>`;
    } else {
        alert('Please upload an image file.');
    }
});

profilePictureInput.addEventListener('change', () => {
    if (profilePictureInput.files.length) {
        const fileName = profilePictureInput.files[0].name;
        dropZone.innerHTML = `<p>${fileName} selected</p>`;
    }
});


const uploadToCloudinary = (file, cloudName, unsignedUploadPreset) => {
    return new Promise((resolve, reject) => {
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

        const fd = new FormData();
        fd.append("upload_preset", unsignedUploadPreset);
        fd.append("file", file);

        fetch(url, {
            method: "POST",
            body: fd,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Upload failed");
                }
                return response.json();
            })
            .then((data) => {
                const resourceUrl = data.secure_url;

                const transformedUrl = resourceUrl.replace(
                    "upload/",
                    "upload/h_200,w_200/r_max/c_crop,g_face"
                );

                // console.log("Uploaded successfully:", resourceUrl);
                resolve({ resourceUrl, transformedUrl }); // Resolve the promise with URLs
            })
            .catch((error) => {
                console.error("Error uploading:", error);
                reject(error); // Reject the promise with the error
            });
    });
};
