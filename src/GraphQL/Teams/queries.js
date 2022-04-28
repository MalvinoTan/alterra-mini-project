import { gql } from "@apollo/client";

export const GET_TEAMS = gql`
    query getTeams($id: Int) {
        teams(where: {id_user: {_eq: $id}}) {
            id
            id_user
            teamName
            university
        }
    }
`;