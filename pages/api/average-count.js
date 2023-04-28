// endpoint takes in an array of lists where each list has adjusted counts for different areas and returns array of averageCounts 
// that correpond to each university using the CSRankings formula
// example: [{"adjustedWeights": [0.5, 1.2, 2.8]}, {"adjustedWeights": [4, 5, 6]}]

export default function count(req, res) {
  const { universities_weights } = req.body;

  const averageCounts = universities_weights.map((uni_weights) => {
    const { adjustedWeights } = uni_weights;
    const product = adjustedWeights.reduce((acc, currWeight) => acc * (currWeight + 1), 1);
    const averageCount = Math.pow(product, 1 / adjustedWeights.length);
    return averageCount;
  });

  res.status(200).json({ averageCounts });
}