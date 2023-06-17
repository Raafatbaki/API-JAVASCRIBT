// let cities = [
//   "الرياض", "جدة", "الدمام"
// ]
// for (let city of cities){
//   const content = `
//   <option>${city}</option>
//   `
//   document.getElementById("cities-select").innerHTML += content
// }
function getPrayersTimingOfCity(cityName) {
  let params = {
    city: cityName, //"Riyadh",
    country: "SA",
  };
  axios
    .get("http://api.aladhan.com/v1/timingsByCity", {
      params: params,
    })
    .then(function (response) {
      const timings = response.data.data.timings;
      // document.getElementById("fajr-time").innerHTML = timings.Fajr

      fillTimeForPrayer("fajr-time", timings.Fajr);
      fillTimeForPrayer("sunrise-time", timings.Sunrise);
      fillTimeForPrayer("dhuhr-time", timings.Dhuhr);
      fillTimeForPrayer("asr-time", timings.Asr);
      fillTimeForPrayer("maghrib-time", timings.Maghrib);
      fillTimeForPrayer("isha-time", timings.Isha);

      const readableDate = response.data.data.date.readable;
      const weekDay = response.data.data.date.hijri.weekday.ar;
      const date = weekDay + " " + readableDate;
      document.getElementById("date").innerHTML = date;
      console.log(weekDay + " " + readableDate);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getPrayersTimingOfCity("Ar Riyad");

function fillTimeForPrayer(id, time) {
  document.getElementById(id).innerHTML = time;
}
