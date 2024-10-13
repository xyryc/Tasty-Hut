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
            class="flex items-center justify-center border rounded-lg hover:bg-gray-100 duration-200 ease-in-out"
          >
            <!-- image -->
            <img
              class="rounded-lg h-[300px] w-[230px] object-cover"
              src="${meal.strMealThumb}"
              alt=""
            />
            <!-- text -->
            <div class="px-6">
              <h3 class="text-2xl font-bold">${meal.strMeal}</h3>
              <p class="text-lg leading-[30px] text-[#706F6F] mt-4 mb-6">
                This dish features a harmonious blend of flavors, with various interpretations available, 
                ensuring a delightful culinary experience.

              </p>
              <button class="text-[#FFC107] font-semibold text-lg underline">
                View Details
              </button>
            </div>
        </div>
        `;

    mealsContainer.appendChild(div);

    console.log(meal);
  });
};

const handleShowAll = () => {
  loadAllMeals(true);
};

loadAllMeals();
