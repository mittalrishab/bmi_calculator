import React, { useState } from 'react'

const App = () => {
  // Initialize state variables; using empty strings for height and weight ensures consistent type handling.
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');

  // Updated calcBMI function now accepts the event parameter and prevents default form submission behavior.
  const calcBMI = (e) => {
    e.preventDefault(); // Prevents page reload on form submission

    // Convert height and weight to numbers to avoid calculation errors
    const h = parseFloat(height);
    const w = parseFloat(weight);

    // Guard against division by zero or invalid inputs
    if (!h || !w) {
      setMessage('Please enter valid numbers for both height and weight.');
      setBmi('');
      return;
    }

    const bmival = (703 * w) / (h * h);
    setBmi(bmival.toFixed(2)); // Format BMI to two decimals

    // Determine BMI category
    if (bmival <= 18.5) {
      setMessage('UnderWeight');
    } else if (bmival > 18.5 && bmival <= 24.9) {
      setMessage('Normal');
    } else if (bmival >= 25 && bmival <= 29.9) {
      setMessage('OverWeight');
    } else {
      setMessage('Obese');
    }
  }

  // Added reload function to clear the form inputs and reset messages.
  const reload = () => {
    setHeight('');
    setWeight('');
    setBmi('');
    setMessage('');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">BMI CALCULATOR</h2>
        {/* Use onSubmit to calculate BMI while preventing page reload */}
        <form onSubmit={calcBMI} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Weight (lbs)</label>
            <input
              type="text"
              placeholder="Enter weight Value"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Height (in)</label>
            <input
              type="text"
              placeholder="Enter height Value"
              value={height}
              onChange={(e) => setHeight(e.target.value)}a
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
            {/* Fixed error: reload function is now defined and properly resets state */}
            <button
              onClick={reload}
              type="button"
              className="bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Reload
            </button>
          </div>
          <div className="text-center mt-4">
            <h3 className="text-xl font-semibold">Your BMI is: {bmi}</h3>
            <p className="text-gray-600">{message}</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App;
