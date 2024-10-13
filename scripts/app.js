const loadAllMeals = async (status) => {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian"
  );
  const data = await response.json();

  if (status) {
    displayAllMeals(data.meals);
  } else {
    displayAllMeals(data.meals.slice(0, 6));
  }
};

const displayAllMeals = (meals) => {
  const mealsContainer = document.getElementById("meals-container");
  // empty the meals container intially
  mealsContainer.innerHTML = "";

  meals.forEach((meal) => {
    const div = document.createElement("div");

    div.innerHTML = `
        <div
            class="flex flex-col lg:flex-row items-center justify-center border rounded-lg hover:bg-gray-100 duration-200 ease-in-out"
          >
            <!-- image -->
            <img
              class="rounded-lg h-[300px] lg:w-[230px] w-full object-cover"
              src="${meal.strMealThumb}"
              alt=""
            />
            <!-- text -->
            <div class="p-6">
              <h3 class="text-2xl font-bold">${meal.strMeal}</h3>
              <p class="text-lg leading-[30px] text-[#706F6F] mt-4 mb-6">
                This dish features a harmonious blend of flavors, with various interpretations available, 
                ensuring a delightful culinary experience.

              </p>
              <button
                onclick="mealDetails('${meal.idMeal}')"
                class="text-[#FFC107] font-semibold text-lg underline">
                    View Details
              </button>
            </div>
        </div>
        `;

    mealsContainer.appendChild(div);
  });
};

const handleShowAll = () => {
  loadAllMeals(true);
};

const mealDetails = async (idMeal) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  );
  const data = await response.json();
  console.log(data.meals[0].strMeal);

  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
          <dialog id="detailsModal" class="modal">
            <div class="modal-box w-11/12 max-w-2xl">
                <form method="dialog">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
              <h3 class="text-3xl font-bold">${data.meals[0].strMeal}</h3>
              <div class="divider"></div>
              <img
                class="w-[672px] h-[410px] rounded-lg object-cover"
                src="${data.meals[0].strMealThumb}"
                alt=""
              />
              <div class="my-10 space-y-4">
                <p class="text-xl font-semibold">
                  Category:
                  <span class="font-normal text-[#706F6F]">${data.meals[0].strCategory}</span>
                </p>
                <p class="text-xl font-semibold">
                  Area: <span class="font-normal text-[#706F6F]">${data.meals[0].strArea}</span>
                </p>
                <p class="text-xl font-semibold">
                  Instructions:
                  <span class="font-normal text-[#706F6F]">${data.meals[0].strInstructions}</span>
                </p>
                <p class="text-xl font-semibold">
                  Youtube:
                  <span class="font-normal text-[#706F6F]"
                    ><a href="${data.meals[0].strYoutube}" target="_blank">${data.meals[0].strYoutube}</a>
                  </span>
                </p>
              </div>
              <div class="modal-action">
                <form method="dialog">
                  <!-- if there is a button, it will close the modal -->
                  <button class="btn btn-error text-white">Close</button>
                </form>
              </div>
            </div>
          </dialog>
  `;

  detailsModal.showModal();
};

loadAllMeals();
