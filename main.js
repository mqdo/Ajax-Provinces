const provincesApi = "https://provinces.open-api.vn/api/?depth=2";

const provinces = []; // list of provinces will be added after fetching request

fetch(provincesApi)
  .then((res) => res.json())
  .then((data) => {
    provinces.push(...data);
    document.querySelector("input").style.pointerEvents = "fill";
  });