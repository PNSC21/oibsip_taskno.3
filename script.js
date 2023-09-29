document.addEventListener("DOMContentLoaded", function () {
  // Conversion functions
  function celsiusToFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
  }

  function fahrenheitToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
  }

  function celsiusToKelvin(celsius) {
    return celsius + 273.15;
  }

  function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
  }

  function fahrenheitToKelvin(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9 + 273.15;
  }

  function kelvinToFahrenheit(kelvin) {
    return (kelvin * 9) / 5 - 459.67;
  }

  // Function to update the "to" unit dropdown based on the selected "from" unit
  function updateToUnitDropdown(fromUnitValue) {
    const toUnitOptions = toUnitSelect.options;

    // Enable all options
    for (let i = 0; i < toUnitOptions.length; i++) {
      toUnitOptions[i].disabled = false;
    }

    // Disable the "from" unit in the "to" dropdown
    for (let i = 0; i < toUnitOptions.length; i++) {
      if (toUnitOptions[i].value === fromUnitValue) {
        toUnitOptions[i].disabled = true;
        break;
      }
    }
  }

  // Get DOM elements
  const temperatureInput = document.getElementById("temperature");
  const fromUnitSelect = document.getElementById("from-unit");
  const toUnitSelect = document.getElementById("to-unit");
  const convertButton = document.getElementById("convert");
  const resultDiv = document.getElementById("result");

  // Add change event listener to the "from" unit dropdown
  fromUnitSelect.addEventListener("change", () => {
    const fromUnitValue = fromUnitSelect.value;
    updateToUnitDropdown(fromUnitValue);
  });

  // Initialize the "to" unit dropdown based on the initial "from" unit
  updateToUnitDropdown(fromUnitSelect.value);

  // Add click event listener to the convert button
  convertButton.addEventListener("click", () => {
    const temperatureValue = parseFloat(temperatureInput.value);
    const fromUnitValue = fromUnitSelect.value;
    const toUnitValue = toUnitSelect.value;

    if (
      !isNaN(temperatureValue) &&
      fromUnitValue !== "select" &&
      toUnitValue !== "select"
    ) {
      // Check if both units are selected and not "Select"
      let convertedValue = 0;
      let fromUnitSymbol = "";
      let toUnitSymbol = "";

      switch (fromUnitValue) {
        case "celsius":
          convertedValue =
            toUnitValue === "fahrenheit"
              ? celsiusToFahrenheit(temperatureValue)
              : celsiusToKelvin(temperatureValue);
          fromUnitSymbol = "°C";
          break;

        case "fahrenheit":
          convertedValue =
            toUnitValue === "celsius"
              ? fahrenheitToCelsius(temperatureValue)
              : fahrenheitToKelvin(temperatureValue);
          fromUnitSymbol = "°F";
          break;

        case "kelvin":
          convertedValue =
            toUnitValue === "celsius"
              ? kelvinToCelsius(temperatureValue)
              : kelvinToFahrenheit(temperatureValue);
          fromUnitSymbol = "K";
          break;

        default:
          resultDiv.textContent = "Invalid from unit.";
          return;
      }

      switch (toUnitValue) {
        case "celsius":
          toUnitSymbol = "°C";
          break;
        case "fahrenheit":
          toUnitSymbol = "°F";
          break;
        case "kelvin":
          toUnitSymbol = "K";
          break;

        default:
          resultDiv.textContent = "Invalid to unit.";
          return;
      }

      resultDiv.textContent = `${temperatureValue} ${fromUnitSymbol} is ${convertedValue.toFixed(
        2
      )} ${toUnitSymbol}`;
    } else {
      alert("Please select valid source and target units.");
    }
  });
});
