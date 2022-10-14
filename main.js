const provincesApi = "https://provinces.open-api.vn/api/?depth=2";

const provinces = []; // list of provinces will be added after fetching request

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const province = $("input");

fetch(provincesApi)
  .then((res) => res.json())
  .then((data) => {
    provinces.push(...data);
    $("input").style.pointerEvents = "fill";
  });

const findMatches = (findProvinces, event) => {
  const regex = new RegExp(`${event.target.value.trim()}`, "g");
  provinces.forEach((province) => {
    if (regex.test(province.name)) {
      findProvinces.push({
        name: province.name.replace(
          regex,
          `<span class="highlight">${event.target.value}</span>`
        ),
        phone: province.phone_code,
      });
    } else {
      province.districts.forEach((district) => {
        if (regex.test(district.name)) {
          findProvinces.push({
            name: `${district.name.replace(
              regex,
              `<span class="highlight">${event.target.value}</span>`
            )}, ${province.name}`,
            phone: province.phone_code,
          });
        }
      });
    }
  });
};

const inputHandler = (event) => {
  if (event.target.value !== "") {
    const findProvinces = [];
    findMatches(findProvinces, event);
    const result = findProvinces
      .map((province) => {
        return `<li><span>${province.name}</span><span class="num-code">(${province.phone})</span></li>`;
      })
      .join("");
    $("ul").innerHTML = result;
  } else $("ul").innerHTML = "";
};

province.addEventListener("change", inputHandler);
province.addEventListener("keyup", inputHandler);
