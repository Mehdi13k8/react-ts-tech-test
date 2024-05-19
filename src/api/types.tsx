export type AuthorityType = {
    LocalAuthorityId: number;
    LocalAuthorityIdCode: string;
    Name: string;
    EstablishmentCount: number;
    SchemeType: number;
    links: { rel: string; href: string }[];
};

export type CountriesType = {
    id: number;
    name: string;
};

export type AuthoritiesResponseType = {
    authorities: AuthorityType[];
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
    links: { rel: string; href: string }[];
};

export interface Authority {
    LocalAuthorityId: string;
    id: string;
    name: string;
  }

export interface AuthorityFilterProps {
    authorities: Authority[];
    onSelectAuthority: (authorityId: string | null) => void;
  }
  