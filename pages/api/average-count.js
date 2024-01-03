// This endpoint takes in an array of objects, where each object contains a list of adjusted counts for different areas.
// It calculates and returns an array of average counts for each university using the CSRankings formula.
// Example input: [{"adjustedWeights": [0.5, 1.2, 2.8]}, {"adjustedWeights": [4, 5, 6]}]

export default function count(req, res) {
  // Extract the 'universities_weights' array from the request body.
  const { universities_weights } = req.body;

  // Map through each university's weights to calculate the average count.
  const averageCounts = universities_weights.map((uni_weights) => {
    // Extract the 'adjustedWeights' array from the current university's object.
    const { adjustedWeights } = uni_weights;

    // Calculate the product of adjusted weights plus 1 for each area.
    const product = adjustedWeights.reduce(
      (acc, currWeight) => acc * (currWeight + 1),
      1
    );

    // Calculate the average count using the CSRankings formula.
    const averageCount = Math.pow(product, 1 / adjustedWeights.length);

    // Return the calculated average count for the current university.
    return averageCount;
  });

  // Send a JSON response with the array of average counts.
  res.status(200).json({ averageCounts });
}
