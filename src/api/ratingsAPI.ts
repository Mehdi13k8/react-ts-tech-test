export type EstablishmentsType = {
  establishments: {}[];
  meta: {
    dataSource: string;
    extractDate: string;
    itemCount: number;
    returncode: string;
    totalCount: number;
    totalPages: number;
    pageSize: number;
    pageNumber: number;
  };
  links: [
    {
      rel: string;
      href: string;
    }
  ];
};

export function getEstablishmentRatings(
  pageNum: number
): Promise<EstablishmentsType> {
  return fetch(
    `http://api.ratings.food.gov.uk/Establishments/basic/${pageNum}/10`,
    { headers: { "x-api-version": "2" } }
  ).then((res) => res.json());
}

export function getEstablishments(
  queryParams: { [key: string]: any }
): Promise<EstablishmentsType> {
  const queryString = Object.keys(queryParams)
    .filter((key) => queryParams[key] !== undefined && queryParams[key] !== null)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
    .join('&');
  console.log(queryString);

  return fetch(`http://api.ratings.food.gov.uk/Establishments?${queryString}`, {
    headers: {
      "x-api-version": "2",
    }
  }).then((res) => res.json());
}
