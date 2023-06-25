import React, { useEffect, useState } from "react";
import axios from "axios";
import { Translator } from "./Translator";
import { TranslatorStatus } from "./TranslatorStatus";

function App() {
  const [translators, setTranslators] = useState([]);
  const [newTranslator, setNewTranslator] = useState(
    new Translator(0, "", 0, TranslatorStatus.Applicant, "")
  );

  const fetchTranslators = async () => {
    try {
      const response = await axios.get(
        "/api/TranslatorsManagement/GetTranslators"
      );
      setTranslators(response.data);
    } catch (error) {
      console.error("Error fetching translators:", error);
    }
  };

  useEffect(() => {
    fetchTranslators();
  }, []);

  const handleInputChange = (e) => {
    setNewTranslator({
      ...newTranslator,
      [e.target.name]: e.target.value,
    });
  };

  const addTranslator = async () => {
    try {
      const response = await axios.post(
        "/api/TranslatorsManagement/AddTranslator",
        newTranslator
      );
      console.log("New translator added:", response.data);
      fetchTranslators();
      setNewTranslator(
        new Translator(0, "", 0, TranslatorStatus.Applicant, "")
      );
    } catch (error) {
      console.error("Error adding translator:", error);
    }
  };

  return (
    <div className="App">
      <h1>Translators:</h1>
      <ul>
        {translators.map((translator) => (
          <li key={translator.id}>
            {translator.name} - Hourly Rate: {translator.hourlyRate} - Status:{" "}
            {translator.status} - Credit card number:{" "}
            {translator.creditCardNumber}
          </li>
        ))}
      </ul>

      <h1>Add New Translator:</h1>
      <form onSubmit={addTranslator}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newTranslator.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Hourly Rate:</label>
          <input
            type="number"
            name="hourlyRate"
            value={newTranslator.hourlyRate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={newTranslator.status}
            onChange={handleInputChange}
          >
            {Object.entries(TranslatorStatus).map(([key, value]) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Credit Card Number:</label>
          <input
            type="text"
            name="creditCardNumber"
            value={newTranslator.creditCardNumber}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add Translator</button>
      </form>
    </div>
  );
}

export default App;
