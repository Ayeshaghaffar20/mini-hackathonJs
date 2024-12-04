import { collection, getDocs, db } from "./firebase.js";


const postAdd = document.getElementById("postAdd");

const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);

  // if (localStorage.getItem("role") === doc.data().role) {
  cardsAdd.innerHTML += ` <div class="h-100 w-full rounded-xl bg-white  shadow-md">


  <article class="mx-auto  flex max-w-md flex-col  px-2  md:max-w-5xl md:flex-row md:items-center">
    <div class="shrink-0 my-4 md:mr-8 md:max-w-sm">
      <img class="rounded-2xl" src="${doc.data().imageUrl}?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" alt="" />
    </div>
    <div class="py-4 sm:py-8">
      <a href="#" class="mb-6 block text-2xl font-medium text-gray-700">${doc.data().bio}</a>
      <p class="mb-6 text-gray-500">${doc.data().fullName}</p>
      <div class="flex items-center">
        <img class="h-10 w-10 rounded-full object-cover" src="${doc.data().imageUrl}" alt="Simon Lewis" />
        <p class="ml-4 w-56">
          <strong class="block font-medium text-gray-700">${doc.data().email}</strong>
          <span class="text-sm text-gray-400">${doc.data().createdAt.toDate()}</span>
        </p>
      </div>
    </div>
  </article>



          </div>`
  // }

});


