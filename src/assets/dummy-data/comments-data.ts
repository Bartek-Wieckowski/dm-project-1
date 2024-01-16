export const data = [
  {
    username: "test1",
    comment: "documents",
    subComments: [
      {
        username: "test2",
        comment: "27-10-1990",
      },
      {
        username: "test3",
        comment: "invoices",
        subComments: [
          {
            comment: "electricityBills",
            username: "test2",
            subComments: [
              { comment: "invoice1", username: "test1" },
              { comment: "invoice2", username: "test3" },
            ],
          },
        ],
      },
    ],
  },
  {
    comment: "photos",
    username: "test2",
    subComments: [
      {
        comment: "summer2020",
        username: "test3",
        subComments: [{ comment: "10.25", username: "test1" }],
      },
    ],
  },
];
