const data = [
    {
    rank: 1,
    institution: 'Carnegie Mellon University',
    count: 20.2,
    numFaculty: 162,
    area: 'Programming Languages',
    faculties: [
        {faculty: "Montek Singh", pub: 1231, adj: 3},
        {faculty: "Ketan Mayer-Patel", pub: 144, adj: 31},
    ],
    },
    {
    rank: 2,
    institution: 'Univ. of Illinois at Urbana-Champaign',
    count: 14.3,
    numFaculty: 110,
    area: 'Programming Languages',
    faculties: [
        {faculty: "John Doe", pub: 1231, adj: 3},
    ],
    },
    {
    rank: 3,
    institution: 'Massachusetts Institute of Technology',
    count: 13.4,
    numFaculty: 92,
    area: 'Programming Languages',
    faculties: [
        {faculty: "Chris King", pub: 931, adj: 3},
    ],
    },
    {
    rank: 4,
    institution: 'Univ. of California - San Diego',
    count: 11.9,
    numFaculty: 108,
    area: 'Databases',
    faculties: [
        {faculty: "Tao", pub: 1231, adj: 3},
    ],
    },
    {
    rank: 5,
    institution: 'Stanford University',
    count: 11.8,
    numFaculty: 69,
    area: 'Programming Languages',
    faculties: [
        {faculty: "Jake", pub: 1231, adj: 3},
    ],
    },
    {
    rank: 6,
    institution: 'University of Michigan',
    count: 11.0,
    numFaculty: 96,
    area: 'Artificial Intelligence',
    faculties: [
        {faculty: "Harry", pub: 1231, adj: 3},
    ],
    },
];

// this endpoint should return the table. Right now, it is a template where code needs to be added to filter based on area
// and the table with values filled needs to be returned
export default (req, res) => {
// add filter for checkboxes: only accept checkboxes that are true
    res.status(200).json(data);
};
