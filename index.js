const sections = ["protest", "feni", "noakhali"];
const totalDonated = {
  protest: 1500,
  feni: 1000,
  noakhali: 500,
};
const screens = {
  donation: ["noakhali", "feni", "protest"],
  history: ["history"],
};
const donationSentences = {
  protest: " Taka is Donated for Aid for Injured in the Quota Movement, Bangladesh",
  feni: " Taka is Donated for Flood Relief in Feni, Bangladesh",
  noakhali: " Taka is Donated for Flood Relief in Noakhali, Bangladesh",
}

let currentScreen = "donation";
let currentBalance = 80000;

function uploadHistory(section, amount) {
    document.getElementById('history').innerHTML += `<div class="bg-slate-800 p-4 rounded-md border-2 border-gray-500">
          <h2 class="font-bold text-xl">
            <strong>${amount.toLocaleString()}</strong> ${donationSentences[section]}
          </h2>
          <aside>
            <span class="font-medium">Date:</span> ${new Date().toLocaleString()}
          </aside>
        </div>`
}

function updateBalance(balance) {
  currentBalance = balance;
  document.getElementById("current-balance").innerText =
    balance.toLocaleString();
}

function updateDonatedAmount(section, amount) /*ajaira Shared function*/ {
  totalDonated[section] += amount;
  document.getElementById("donated-" + section).innerText =
    totalDonated[section].toLocaleString();
}

function bindDonateClick(sectionName) /*Shared function*/ {
  if (document.getElementById("donate-" + sectionName) != undefined) {
    document
      .getElementById("donate-" + sectionName)
      .addEventListener("click", function (event) {
        const donationAmount = parseInt(
          document.getElementById("amount-" + sectionName).value
        );
        if (isNaN(donationAmount) == false && donationAmount > 0) {
          if (donationAmount <= currentBalance) {
            updateDonatedAmount(sectionName, donationAmount);
            uploadHistory(sectionName, donationAmount)
            updateBalance(currentBalance - donationAmount);
            document.getElementById('successful-modal').showModal()
          } else {
            alert("Insufficient funds");
          }
        } else if (
          document.getElementById("amount-" + sectionName).value == ""
        ) {
          alert("Please enter a donation amount");
        } else if (donationAmount <= 0){
          alert("Please enter a positive amount and a number greater than 0")
        } else {
          alert("Please enter a valid amount (number)");
        }
        event.preventDefault();
      });
  }
}

function bindEnableButton(screenName) /*Shared function*/ {
  if (document.getElementById("enable-" + screenName) != undefined) {
    document
      .getElementById("enable-" + screenName)
      .addEventListener("click", function (event) {
        if (currentScreen != screenName) {
          for (const section of screens[screenName]) {
            document.getElementById(section).classList.remove("hidden");
            document
              .getElementById("enable-" + screenName)
              .classList.add("btn-active");
            document
              .getElementById("enable-" + screenName)
              .classList.remove("btn-outline");
            document
              .getElementById("enable-" + screenName)
              .classList.add("bg-green-500");
          }
          for (const item in screens) {
            if (item != screenName) {
              for (const section of screens[item]) {
                document.getElementById(section).classList.add("hidden");
              }
              document
                .getElementById("enable-" + item)
                .classList.remove("btn-active");
              document
                .getElementById("enable-" + item)
                .classList.remove("bg-green-500");
              document
                .getElementById("enable-" + item)
                .classList.add("btn-outline");
            }
          }
        }
        currentScreen = screenName;
        event.preventDefault();
      });
  }
}

for (const name of sections) {
  bindDonateClick(name);
}
for (const screen in screens) {
  bindEnableButton(screen);
}
