import { gql } from "@apollo/client";

export const GET_TEAMS = gql`
    query getTeams {
        teams {
            teamName
            university
            id
        }
    }
`;